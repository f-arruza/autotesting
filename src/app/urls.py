from django.urls import path, include
from rest_framework.routers import SimpleRouter

from app.views import (PasswordResetView, PasswordChangeView,
                       PasswordRedefineView)

router = SimpleRouter()


urlpatterns = [
    path('password_reset/', PasswordResetView.as_view(),
         name='password_reset'),
    path('password_change/', PasswordChangeView.as_view(),
         name='password_change'),
    path('password_redefine/', PasswordRedefineView.as_view(),
         name='password_define'),
    path('', include(router.urls)),
]
