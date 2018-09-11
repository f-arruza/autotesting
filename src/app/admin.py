from django.contrib import admin
from django.contrib.contenttypes.models import ContentType
from rest_framework.generics import get_object_or_404
from app.models import (Project, Application, Browser, TestType,
                        OperatingSystem, Device, WebEnvironment,
                        MobileEnvironment,  TestTool, Activity, TestPlan,
                        Release)
from app.utilities import generate_deploy_descriptor, generate_deploy_folder


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'start_date', 'end_date', 'active',)


@admin.register(Application)
class AplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'project', 'active',)


@admin.register(Browser)
class BrowserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'label', 'template', 'active',)


@admin.register(TestType)
class TestTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'active',)


@admin.register(OperatingSystem)
class OperatingSystemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'active',)


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'active',)


@admin.register(WebEnvironment)
class WebEnvironmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'browser', 'active',)


@admin.register(MobileEnvironment)
class MobileEnvironmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'os', 'device', 'active',)


@admin.register(TestTool)
class TestToolAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'type', 'browser_included',
                    'active',)


@admin.register(Activity)
class Activity(admin.ModelAdmin):
    list_display = ('id', 'type', 'name', 'execution_datetime', 'test_plan',
                    'test_tool', 'parallel_execution', 'active',)


def generate_descriptor(modeladmin, request, queryset):
    selected = request.POST.getlist(admin.ACTION_CHECKBOX_NAME)
    for obj_id in selected:
        test_plan = get_object_or_404(TestPlan, id=obj_id)
        generate_deploy_descriptor(test_plan)


generate_descriptor.short_description = "Generar descriptor de despliegue \
(docker-compose)"


def generate_folder(modeladmin, request, queryset):
    selected = request.POST.getlist(admin.ACTION_CHECKBOX_NAME)
    for obj_id in selected:
        test_plan = get_object_or_404(TestPlan, id=obj_id)
        generate_deploy_folder(test_plan)


generate_folder.short_description = "Generar Release"


@admin.register(TestPlan)
class TestPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'project', 'application',
                    'active',)
    actions = [generate_descriptor, generate_folder]

    def project(self, obj):
        return obj.application.project.name
    project.admin_order_field = 'application__project__name'


@admin.register(Release)
class ReleaseAdmin(admin.ModelAdmin):
    list_display = ('code', 'datetime', 'test_plan',)
