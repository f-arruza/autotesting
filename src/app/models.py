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
        ('02', 'MOVIL')
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
    code = models.CharField('Code', max_length=10)
    name = models.CharField('Name', max_length=100)
    version = models.CharField('Version', max_length=10, default='0')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + ' v' + self.version

    class Meta:
        db_table = 'browser'
        verbose_name_plural = '03. Browsers'


class TestType(models.Model):
    code = models.CharField('Code', max_length=10)
    name = models.CharField('Name', max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        db_table = 'testtype'
        verbose_name_plural = '04. TestTypes'


class OperatingSystem(models.Model):
    code = models.CharField('Code', max_length=10)
    name = models.CharField('Name', max_length=100)
    version = models.CharField('Version', max_length=10)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code + ' - ' + self.name + ' :: ' + self.version

    class Meta:
        db_table = 'operating_systems'
        verbose_name_plural = '05. Operating Systems'


class Device(models.Model):
    code = models.CharField('Code', max_length=10)
    name = models.CharField('Name', max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        db_table = 'devices'
        verbose_name_plural = '06. Devices'


class WebEnvironment(models.Model):
    code = models.CharField('Code', max_length=10)
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


class MovilEnvironment(models.Model):
    code = models.CharField('Code', max_length=10)
    name = models.CharField('Name', max_length=200)
    os = models.ForeignKey(OperatingSystem, on_delete=models.CASCADE,
                           related_name='movil_environments')
    device = models.ForeignKey(Device, on_delete=models.CASCADE,
                               related_name='movil_environments')
    container = models.CharField('Container', max_length=50, default='')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        db_table = 'movil_environment'
        verbose_name_plural = '09. Movil Environments'


class TestTool(models.Model):
    code = models.CharField('Code', max_length=10)
    name = models.CharField('Name', max_length=200)
    version = models.CharField('Version', max_length=10, default='0')
    type = models.ForeignKey(TestType, on_delete=models.CASCADE,
                             related_name='testtools')
    browser = models.ForeignKey(Browser, on_delete=models.CASCADE,
                                related_name='testtools', null=True)
    container = models.CharField('Container', max_length=50, default='')
    command = models.CharField('Command', max_length=100, blank=True)
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

    name = models.CharField('Name', max_length=200)
    type = models.CharField('Type', max_length=2, choices=type, default='02')
    execution_datetime = models.DateTimeField('Execution datetime')
    movil_environments = models.ManyToManyField(MovilEnvironment, null=True,
                                                blank=True)
    web_environments = models.ManyToManyField(WebEnvironment, null=True,
                                              blank=True)
    parallel_execution = models.BooleanField(default=True)

    test_tool = models.ForeignKey(TestTool, on_delete=models.CASCADE,
                                  null=True, related_name='activities')
    test_plan = models.ForeignKey(TestPlan, on_delete=models.CASCADE,
                                  null=True, related_name='activities')
    input_url = models.CharField('Input Url', max_length=100, blank=True)
    output_url = models.CharField('Output Url', max_length=100, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.type + ' - ' + self.name

    class Meta:
        db_table = 'activity'
        verbose_name_plural = '11. Activities'
