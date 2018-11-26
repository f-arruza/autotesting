import os
from os.path import dirname
import time
from stat import *
from django.shortcuts import render
from django.conf import settings
from django.contrib.staticfiles import finders
import requests

API_ENDPOINT = "http://autotesting.ac-visiontech.com:8080/api/v1/projects/1/?format=json"

htmlFiles = []
screenshotsFiles = []


class Folder:
    def __init__(self, name):
        self.name = name
        self.reports = []

    def addReport(self, report):
        self.reports.append(report)


class Report(object):
    def __init__(self, name, path):
        self.name = name
        self.path = path


def post_list(request):
    htmlFiles = []
    screenshotsFiles = []
    response = requests.get(API_ENDPOINT)
    apiData = response.json()
    list_all(Folder("root"),
             settings.STATICFILES_DIR_RESULT, ".html", htmlFiles)  # HTML Files
    list_all(Folder("root"), settings.STATICFILES_SCREENSHOTS_DIR_RESULT,
             ".png", screenshotsFiles)  # Screenshots Files
    return render(request, 'reports.html', {'folders': htmlFiles,
                  'screenshotsFiles': screenshotsFiles, 'apiData': apiData})


def list_all(folder, path, type, list):
    files = os.listdir(path)
    # print(files)
    i = 0
    for file in files:
        low_path = os.path.join(path, file)
        # print("Dir name: --->  " +dirname(dirname(file)))
        path2 = low_path.replace('/app/static/results/', '')
        path2split = path2.split('/')
        folderName = path2
        # print(path2split);
        if len(path2split) > 1:
            folderName = '/'.join(path2split)
            # print("Folder name ----- "+folderName)
        if os.path.isdir(low_path):
            # print("Folder --- " + folderName)
            subFolder = Folder(folderName)
            # list.append(subFolder)
            list_all(subFolder, low_path, type, list)
        else:
            if file.endswith(type):
                # Dejando solo la ruta desde static..
                print(low_path)
                report = Report(file, low_path.replace('/app', ''))
                print(report.path)
                folder.addReport(report)
                # print(" Adding report " + file + " to folder " + folder.name)
                if folder not in list:
                    list.append(folder)
