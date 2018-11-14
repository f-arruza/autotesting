from rest_framework import serializers
from app.models import (Project, Application, Browser, TestType, Device,
                        OperatingSystem, WebEnvironment, MobileEnvironment,
                        TestTool, TestPlan, Activity, Release, Deployment)


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
        fields = (
            'id',
            'screen_high',
            'screen_width',
        )


class MobileEnvironmentSerializer(serializers.ModelSerializer):
    device = serializers.SerializerMethodField()

    class Meta:
        model = MobileEnvironment
        fields = (
            'id',
            'name',
            'os',
            'device',
        )

    @classmethod
    def get_device(self, obj):
        try:
            return obj.device.name
        except Exception as ex:
            return None


class TestToolSerializer(serializers.ModelSerializer):
    id_type = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = TestTool
        fields = (
            'id',
            'code',
            'name',
            'id_type',
            'type',
            'version',
        )

    @classmethod
    def get_id_type(self, obj):
        try:
            return obj.type.id
        except Exception as ex:
            return None

    @classmethod
    def get_type(self, obj):
        try:
            return obj.type.name
        except Exception as ex:
            return None


class ActivitySerializer(serializers.ModelSerializer):
    id_type = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    test_tool = TestToolSerializer()
    mobile_environments = MobileEnvironmentSerializer(many=True)
    web_environments = WebEnvironmentSerializer(many=True)

    class Meta:
        model = Activity
        fields = (
            'id',
            'code',
            'name',
            'id_type',
            'type',
            'test_tool',
            'mobile_environments',
            'web_environments',
        )

    @classmethod
    def get_id_type(self, obj):
        try:
            return obj.type
        except Exception as ex:
            return None

    @classmethod
    def get_type(self, obj):
        try:
            return obj.get_type_display()
        except Exception as ex:
            return None


class ReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Release
        fields = '__all__'


class DeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = '__all__'


class TestPlanSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True)

    class Meta:
        model = TestPlan
        fields = (
            'id',
            'code',
            'name',
            'descriptor_file',
            'activities',
        )


class ApplicationSerializer(serializers.ModelSerializer):
    id_type = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    testplans = TestPlanSerializer(many=True)

    class Meta:
        model = Application
        fields = (
            'id',
            'name',
            'version',
            'src_url',
            'apk_url',
            'id_type',
            'type',
            'testplans',
        )

    @classmethod
    def get_id_type(self, obj):
        try:
            return obj.type
        except Exception as ex:
            return None

    @classmethod
    def get_type(self, obj):
        try:
            return obj.get_type_display()
        except Exception as ex:
            return None


class ProjectSerializer(serializers.ModelSerializer):
    applications = ApplicationSerializer(many=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'start_date',
            'end_date',
            'applications',
        )
