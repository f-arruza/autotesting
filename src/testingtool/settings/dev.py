import sys

from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

STATIC_URL = '/static/'

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INTERNAL_IPS = (
    '127.0.0.1',
    '0.0.0.0',
)


def custom_show_toolbar(self):
    return True


DEBUG_TOOLBAR_CONFIG = {
    'SHOW_TOOLBAR_CALLBACK': custom_show_toolbar,
}

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR + '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR + '/media/'

if 'test' in sys.argv:
    DATABASES['default'] = {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test'
    }

CORS_ORIGIN_ALLOW_ALL = True
