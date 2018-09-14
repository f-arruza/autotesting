from rest_framework import serializers
from app.models import (Project, Application, Browser, TestType, Device,
                        OperatingSystem, WebEnvironment, MobileEnvironment,
                        TestTool, TestPlan, Activity, Release, Deployment)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


class BrowserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Browser
        fields = '__all__'


class TestTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestType
        fields = '__all__'


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'


class OperatingSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperatingSystem
        fields = '__all__'


class WebEnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebEnvironment
        fields = '__all__'


class MobileEnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileEnvironment
        fields = '__all__'


class TestToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestTool
        fields = '__all__'


class TestPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlan
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class ReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Release
        fields = '__all__'


class DeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = '__all__'
