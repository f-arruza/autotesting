import os
from os.path import dirname
import time
from stat import * # ST_SIZE etc
from django.shortcuts import render
from django.conf import settings
from django.contrib.staticfiles import finders
import requests

API_ENDPOINT = "http://autotesting.ac-visiontech.com:8080/api/v1/projects/1/?format=json"

class TestPlan:
    def __init__(self, name):
        self.name = name
        self.apis = []

    def addApi(self, api):
        self.apis.append(api)

class Api:
    def __init__(self, name):
        self.name = name
        self.files = []

    def addFile(self, file):
        self.files.append(file)

class File(object):
    def __init__(self, name, path):
        self.name = name
        self.path = path

def post_list(request):

    response = requests.get(API_ENDPOINT)
    apiData = response.json()
    testPlansNames = os.listdir(settings.STATICFILES_REPORTS_DIR_RESULT)
    testPlans = []

    for testPlanName in testPlansNames:
        tempTestPlan = TestPlan(testPlanName);
        filesNames = os.listdir(settings.STATICFILES_REPORTS_DIR_RESULT + "/" + testPlanName) #Carpeta Reportes
        for apiName in filesNames:
            if apiName != "assets":
                api = Api(apiName)
                if apiName.endswith("html"):
                    api = Api("Reporte varias Apis")
                    api.addFile(File("Reporte.html", os.path.join('static/results/reports/' + testPlanName + '/', apiName)))
                else:
                    apiRoot = settings.STATICFILES_REPORTS_DIR_RESULT + "/" + testPlanName + "/" + apiName;
                    apisFiles = os.listdir(apiRoot);
                    if apiName != "calabash" and apiName != "stryker":
                        for fileName in apisFiles:
                            api.addFile(File(fileName, os.path.join('static/results/reports/' + testPlanName + '/' + apiName, fileName)))
                    elif apiName == "calabash":
                        for fileName in apisFiles:
                            for mutantFile in os.listdir(apiRoot + "/" + fileName): #Contienen subdirectorios por mutantes
                                if mutantFile.endswith("html"):
                                    api.addFile(File("Reporte: " +fileName, os.path.join('static/results/reports/' + testPlanName + '/' + apiName + '/' + fileName, mutantFile)))
                                elif mutantFile.endswith("png"):
                                    api.addFile(File(mutantFile, os.path.join('static/results/reports/' + testPlanName + '/' + apiName + '/' + fileName,mutantFile)))
                    elif apiName == "stryker":
                        for mutantFile in os.listdir(apiRoot + "/mutation/html/"): #Contienen subdirectorios por mutantes
                            if mutantFile == "index.html":
                                api.addFile(File("mutation.html", os.path.join('static/results/reports/' + testPlanName + '/' + apiName  + "/mutation/html/", mutantFile)))
                        for coverageFile in os.listdir(apiRoot + "/coverage/"): #Contienen subdirectorios por mutantes
                            if coverageFile == "index.html":
                                api.addFile(File("coverage.html", os.path.join('static/results/reports/' + testPlanName + '/' + apiName  + "/coverage", coverageFile)))
                tempTestPlan.addApi(api)

        try: # Se pone bloque try/catch por si no se encuentra el plan de pruebas.
            filesNames = os.listdir(
                settings.STATICFILES_SCREENSHOTS_DIR_RESULT + "/" + testPlanName)  # Carpeta Screenshots
            for apiName in filesNames:
                api = Api(apiName)
                apiRoot = settings.STATICFILES_SCREENSHOTS_DIR_RESULT + "/" + testPlanName + "/" + apiName;
                apisFiles = os.listdir(apiRoot);
                for fileName in apisFiles:
                    api.addFile(File(fileName, os.path.join('static/results/screenshots/' + testPlanName + '/' + apiName, fileName)))
                tempTestPlan.addApi(api)
        except Exception as inst:
            print(inst)

        testPlans.append(tempTestPlan);
        print("Test plan: " + testPlanName)
        print(tempTestPlan.apis)
        print("\n")
    return render(request, 'reports.html', {'testPlans': testPlans, 'apiData': apiData})