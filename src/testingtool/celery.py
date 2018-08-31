from __future__ import absolute_import, unicode_literals
import os
from django.conf import settings
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'testingtool.settings.dev')

app = Celery('testingtool')
app.conf.broker_url = 'redis://' + settings.REDIS_HOST + ':'
app.conf.broker_url = app.conf.broker_url + settings.REDIS_PORT + '/0'

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
