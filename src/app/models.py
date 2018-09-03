import os
import uuid
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField('Name', max_length=100)
    start_date = models.DateField('Start date')
    end_date = models.DateField('End date')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'project'
        verbose_name_plural = '01. Projects'


class Aplication(models.Model):
    type = (
        ('01', 'WEB'),
        ('02', 'MOBILE')
    )

    name = models.CharField('Name', max_length=100)
    src_url = models.CharField('Source Url', max_length=100)
    apk_url = models.CharField('APK Url', max_length=100, blank=True)
    type = models.CharField('Type', max_length=2, choices=type, default='01')
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='applications')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + ' (' + self.type + ')'

    class Meta:
        db_table = 'application'
        verbose_name_plural = '02. Applications'


class Browser(models.Model):
    name = models.CharField('Name', max_length=100)
    version = models.CharField('Version', max_length=10, default='0')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + ' v' + self.version

    class Meta:
        db_table = 'browser'
        verbose_name_plural = '03. Browsers'


class TestType(models.Model):
    name = models.CharField('Name', max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'testtype'
        verbose_name_plural = '04. TestTypes'


class OperatingSystem(models.Model):
    name = models.CharField('Name', max_length=100)
    version = models.CharField('Version', max_length=10)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + ' :: ' + self.version

    class Meta:
        db_table = 'operating_systems'
        verbose_name_plural = '05. Operating Systems'


class Device(models.Model):
    name = models.CharField('Name', max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'devices'
        verbose_name_plural = '06. Devices'


class WebEnvironment(models.Model):
    code = models.UUIDField(primary_key=True, default=uuid.uuid4,
                            editable=False)
    name = models.CharField('Name', max_length=200)
    browser = models.ForeignKey(Browser, on_delete=models.CASCADE,
                                null=True, related_name='web_environments')
    screen_high = models.PositiveIntegerField('Screen High', default=600)
    screen_width = models.PositiveIntegerField('Screen Width', default=800)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        db_table = 'web_environment'
        verbose_name_plural = '08. Web Environments'


class MobileEnvironment(models.Model):
    code = models.UUIDField(primary_key=True, default=uuid.uuid4,
                            editable=False)
    name = models.CharField('Name', max_length=200)
    os = models.ForeignKey(OperatingSystem, on_delete=models.CASCADE,
                           related_name='mobile_environments')
    device = models.ForeignKey(Device, on_delete=models.CASCADE,
                               related_name='mobile_environments')
    container = models.CharField('Container', max_length=50, default='')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        db_table = 'mobile_environment'
        verbose_name_plural = '09. Mobile Environments'


def get_archivo_upload_path(instance, filename):
    return "templates/{}.PDF".format(instance.id)


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.zip']

    if not ext.lower() in valid_extensions:
        raise ValidationError('Solo se admiten archivos ZIP')


class TestTool(models.Model):
    code = models.UUIDField(primary_key=True, default=uuid.uuid4,
                            editable=False)
    name = models.CharField('Name', max_length=200)
    version = models.CharField('Version', max_length=10, default='0')
    type = models.ForeignKey(TestType, on_delete=models.CASCADE,
                             related_name='testtools')
    browser = models.ForeignKey(Browser, on_delete=models.CASCADE,
                                related_name='testtools', null=True)
    container_label = models.CharField('Container Label', max_length=50,
                                       blank=True)
    container_desc = models.CharField('Container Descriptor', max_length=50,
                                      default='')
    command = models.CharField('Command', max_length=100, blank=True)
    source_path = models.CharField('Source Path', max_length=50, blank=True)
    template = models.FileField('Template Folder', null=True,
                                upload_to=get_archivo_upload_path,
                                validators=[validate_file_extension])
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + ' - ' + self.type.name + ' - ' + str(self.browser)

    class Meta:
        db_table = 'testtool'
        verbose_name_plural = '07. TestTools'


class TestPlan(models.Model):
    name = models.CharField('Name', max_length=200)
    stakeholders = models.ManyToManyField(User)

    application = models.ForeignKey(Aplication, on_delete=models.CASCADE,
                                    related_name='testplans')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + ' - ' + str(self.application)

    class Meta:
        db_table = 'testplan'
        verbose_name_plural = '10. TestPlans'


class Activity(models.Model):
    type = (
        ('01', 'Generate Tests'),
        ('02', 'Run Tests')
    )

    code = models.UUIDField(primary_key=True, default=uuid.uuid4,
                            editable=False)
    name = models.CharField('Name', max_length=200)
    type = models.CharField('Type', max_length=2, choices=type, default='02')
    execution_datetime = models.DateTimeField('Execution datetime')
    mobile_environments = models.ManyToManyField(MobileEnvironment, null=True,
                                                 blank=True)
    web_environments = models.ManyToManyField(WebEnvironment, null=True,
                                              blank=True)
    parallel_execution = models.BooleanField(default=True)

    test_tool = models.ForeignKey(TestTool, on_delete=models.CASCADE,
                                  null=True, related_name='activities')
    test_plan = models.ForeignKey(TestPlan, on_delete=models.CASCADE,
                                  null=True, related_name='activities')
    testsuite = models.FileField('Test Suite', null=True,
                                 upload_to=get_archivo_upload_path,
                                 validators=[validate_file_extension])
    output_url = models.CharField('Output Url', max_length=100, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.type + ' - ' + self.name

    class Meta:
        db_table = 'activity'
        verbose_name_plural = '11. Activities'
