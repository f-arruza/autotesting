from django.contrib import admin
from app.models import (Project, Aplication, Browser, TestType,
                        OperatingSystem, Device, WebEnvironment,
                        MobileEnvironment,  TestTool, Activity, TestPlan)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'start_date', 'end_date', 'active',)


@admin.register(Aplication)
class AplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'project', 'active',)


@admin.register(Browser)
class BrowserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'active',)


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
    list_display = ('code', 'name', 'browser', 'active',)


@admin.register(MobileEnvironment)
class MobileEnvironmentAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'os', 'device', 'active',)


@admin.register(TestTool)
class TestToolAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'version', 'type', 'browser',
                    'active',)


@admin.register(Activity)
class Activity(admin.ModelAdmin):
    list_display = ('code', 'type', 'name', 'execution_datetime',
                    'parallel_execution', 'active',)


@admin.register(TestPlan)
class TestPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'application', 'active',)
