from django.urls import path, include
from rest_framework.routers import SimpleRouter

from app.views import (ProjectViewSet, ApplicationViewSet, BrowserViewSet,
                       TestTypeViewSet, DeviceViewSet, OperatingSystemViewSet,
                       WebEnvironmentViewSet, MobileEnvironmentViewSet,
                       TestToolViewSet, TestPlanViewSet, ActivityViewSet,
                       PasswordResetView, PasswordChangeView,
                       PasswordRedefineView, DescriptorView, ReleaseViewSet)

router = SimpleRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'applications', ApplicationViewSet)
router.register(r'browsers', BrowserViewSet)
router.register(r'testtypes', TestTypeViewSet)
router.register(r'devices', DeviceViewSet)
router.register(r'operationsystems', OperatingSystemViewSet)
router.register(r'webenvironments', WebEnvironmentViewSet)
router.register(r'mobileenvironments', MobileEnvironmentViewSet)
router.register(r'testtools', TestToolViewSet)
router.register(r'testplans', TestPlanViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'releases', ReleaseViewSet)

urlpatterns = [
    path('descriptors/<int:id>/', DescriptorView.as_view(),
         name='descriptors'),
    path('password_reset/', PasswordResetView.as_view(),
         name='password_reset'),
    path('password_change/', PasswordChangeView.as_view(),
         name='password_change'),
    path('password_redefine/', PasswordRedefineView.as_view(),
         name='password_define'),
    path('', include(router.urls)),
]
