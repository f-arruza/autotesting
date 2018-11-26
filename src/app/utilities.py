# -*- coding: utf-8 -*-
import os
import shutil
import zipfile
from jinja2 import Environment, PackageLoader, select_autoescape
from app.models import Release
from django.core.files import File
from django.conf import settings


def generate_deploy_descriptor(test_plan):
    tools = []
    env = Environment(loader=PackageLoader('app'), autoescape=False)
    main_tmp = env.get_template('main.tmp')
    commons = {}

    for activity in test_plan.activities.filter(active=True):
        test_tool = activity.test_tool
        if not activity.test_tool.active:
            continue

        template = env.get_template(test_tool.template)

        # NOTE: incluir template común solo una vez
        if test_tool.template_common != '':
            if test_tool.template_common not in commons:
                commons[test_tool.template_common] = True
                tmp_common = env.get_template(test_tool.template_common)
                tools.append({'descriptor': tmp_common.render()})

        # NOTE: si el navegador está incluido en la herramienta no se buscan
        # otras dependencias
        txt = test_tool.command
        print(txt)
        if test_tool.browser_included:
            descriptor = template.render(
                                    container_label=test_tool.container_label,
                                    container_desc=test_tool.container_desc,
                                    command=test_tool.command,
                                    source_path=test_tool.source_path)
        else:
            # NOTE: Incluir dependencias con navegadores
            browsers = []
            for browser in test_tool.browsers.filter(active=True):
                browsers.append(browser.label)

                if browser.label not in commons:
                    commons[browser.label] = True
                    tmp_browser = env.get_template(browser.template)
                    tools.append({'descriptor': tmp_browser.render()})
            print(commons)
            descriptor = template.render(
                                    container_label=test_tool.container_label,
                                    container_desc=test_tool.container_desc,
                                    command=test_tool.command,
                                    source_path=test_tool.source_path,
                                    browsers=browsers)
        tools.append({'descriptor': descriptor})

    # NOTE: Generar descriptor de despliegue y adjuntarlo al TestPlan
    outfile = open('{}{}/{}.yml'.format(settings.MEDIA_ROOT, 'descriptors',
                                        test_plan.code), "w")
    outfile.write(main_tmp.render(tools=tools))
    test_plan.descriptor_file = '{}/{}.yml'.format('descriptors',
                                                   test_plan.code)
    test_plan.save()
    return 'Generated descriptor'


def compressFolderToZip(folder, data):
    path = os.path.join(folder, os.path.basename(data) + '.zip')
    zip = zipfile.ZipFile(path, 'w')

    for folder, subfolders, files in os.walk(data):
        for file in files:
            zip.write(os.path.join(folder, file),
                      os.path.relpath(os.path.join(folder, file),
                      data),
                      compress_type=zipfile.ZIP_DEFLATED)
    zip.close()
    return path


def generate_deploy_folder(test_plan):
    env = Environment(loader=PackageLoader('app'), autoescape=False)
    dir = '{}{}{}'.format(settings.BASE_DIR, '/tmp/', test_plan.code)
    if os.path.exists(dir):
        shutil.rmtree(dir)
    os.makedirs(dir)

    # Descargar descriptor de despliegue
    file_path_src = os.path.join(settings.MEDIA_ROOT,
                                 test_plan.descriptor_file.path)
    file_path_dest = os.path.join(dir, 'docker-compose.yml')
    shutil.copy(file_path_src, file_path_dest)

    # Descargar descriptores de las herramientas involucradas
    dockerfiles = '{}{}'.format(dir, '/dockerfiles')
    os.makedirs(dockerfiles)

    # Descargar configuración de ReportBuilder
    file_path_src = os.path.join(settings.BASE_DIR, 'resources',
                                 'dockerfiles/Report_Builder.zip')
    file_path_dest = os.path.join(dockerfiles, 'Report_Builder.zip')
    shutil.copy(file_path_src, file_path_dest)

    zip_ref = zipfile.ZipFile(file_path_dest, 'r')
    zip_ref.extractall(dockerfiles)
    zip_ref.close()
    os.remove(file_path_dest)

    # Descargar configuración de Nginx
    file_path_src = os.path.join(settings.BASE_DIR, 'resources',
                                 'dockerfiles/Nginx.zip')
    file_path_dest = os.path.join(dockerfiles, 'Nginx.zip')
    shutil.copy(file_path_src, file_path_dest)

    zip_ref = zipfile.ZipFile(file_path_dest, 'r')
    zip_ref.extractall(dockerfiles)
    zip_ref.close()
    os.remove(file_path_dest)

    # Descargar configuración de ReportsApplication
    file_path_src = os.path.join(settings.BASE_DIR, 'resources',
                                 'dockerfiles/ReportsApplication.zip')
    file_path_dest = os.path.join(dockerfiles, 'ReportsApplication.zip')
    shutil.copy(file_path_src, file_path_dest)

    zip_ref = zipfile.ZipFile(file_path_dest, 'r')
    zip_ref.extractall(dockerfiles)
    zip_ref.close()
    os.remove(file_path_dest)

    # Crear carpetas para TestSuite y Resultados
    # source_path = '{}{}'.format(dir, test_tool.source_path.strip('.'))
    source_path = '{}{}'.format(dir, '/src')
    if not os.path.exists(source_path):
        os.makedirs(source_path)

    # Descargar configuración de ReportsApplication - SRC
    file_path_src = os.path.join(settings.BASE_DIR, 'resources',
                                 'src/reports-webapp.zip')
    file_path_dest = os.path.join(source_path, 'reports-webapp.zip')
    shutil.copy(file_path_src, file_path_dest)

    zip_ref = zipfile.ZipFile(file_path_dest, 'r')
    zip_ref.extractall(source_path)
    zip_ref.close()
    os.remove(file_path_dest)

    for activity in test_plan.activities.filter(active=True):
        test_tool = activity.test_tool
        if not activity.test_tool.active:
            continue

        # Descargar y descomprimir descriptores
        if test_tool.descriptor_file:
            file_path_src = os.path.join(settings.MEDIA_ROOT,
                                         test_tool.descriptor_file.path)
            file_path_dest = os.path.join(dockerfiles, os.path.basename(
                                            test_tool.descriptor_file.path))
            shutil.copy(file_path_src, file_path_dest)

            zip_ref = zipfile.ZipFile(file_path_dest, 'r')
            zip_ref.extractall(dockerfiles)
            zip_ref.close()
            os.remove(file_path_dest)

        # Descargar TestSuite
        file_path_src = os.path.join(settings.MEDIA_ROOT,
                                     activity.testsuite.path)
        file_path_dest = os.path.join(source_path, os.path.basename(
                                        activity.testsuite.path))
        shutil.copy(file_path_src, file_path_dest)

        zip_ref = zipfile.ZipFile(file_path_dest, 'r')
        zip_ref.extractall(source_path)
        zip_ref.close()
        os.remove(file_path_dest)

    # Comprimir Release
    folder = '{}{}'.format(settings.BASE_DIR, '/tmp')
    release = compressFolderToZip(folder, dir)
    obj = Release.objects.create(test_plan=test_plan)
    obj.save()

    file_path_dest = os.path.join(settings.MEDIA_ROOT, 'releases',
                                  str(obj.code) + '.zip')
    shutil.copy(release, file_path_dest)
    obj.testsuite = '{}/{}.zip'.format('releases', str(obj.code))
    obj.save()

    # Generar archivo de Deployment
    deploy_tmp = env.get_template('deployment.tmp')
    outfile = open('{}{}/{}.sh'.format(settings.MEDIA_ROOT, 'releases',
                                       obj.code), "w")
    outfile.write(deploy_tmp.render(release_code=obj.code))
    obj.deployment_file = '{}/{}.sh'.format('releases', obj.code)
    obj.save()

    # Eliminar archivos temporales
    os.remove(release)
    shutil.rmtree(dir)
