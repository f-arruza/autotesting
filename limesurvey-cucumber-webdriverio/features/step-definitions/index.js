//Complete siguiendo las instrucciones del taller
var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {

    Given('I go to limesurvey login', () => {
        browser.url('admin');
        browser.waitForVisible('h3=Ingresar:', 10000);
    });

    When('I open the login screen', () => {
        browser.waitForVisible('button=Ingresar', 10000);
        //browser.click('button=Ingresar:');
    });

    When('I fill a wrong username and password', () => {
        var cajaLogIn = browser.element('.login-content-form');

        var mailInput = cajaLogIn.element('input[name="user"]');
        mailInput.click();
        mailInput.keys('wrongusername');

        var passwordInput = cajaLogIn.element('input[name="password"]');
        passwordInput.click();
        passwordInput.keys('55555555')
    });

    When('I fill a good username and password', () => {
        var cajaLogIn = browser.element('.login-content-form');

        var mailInput = cajaLogIn.element('input[name="user"]');
        mailInput.click();
        mailInput.keys('admin');

        var passwordInput = cajaLogIn.element('input[name="password"]');
        passwordInput.click();
        passwordInput.keys('123456789')
    });

    When('I fill fields for create survey', () => {
        var createSurveyBox = browser.element('.ls-panelboxes .selector__create_survey');
        createSurveyBox.click();

        var cajaTitle = browser.element('#texts');
        var titleInput = cajaTitle.element('#surveyls_title');
        titleInput.click();
        titleInput.keys("Survey MISO - BDT Test");

        var cajaButtonSave = browser.element('.menubar');
        var buttonSave = cajaButtonSave.element('a[id="save-form-button"]');
        buttonSave.click();
    });

    When('I try see list of surveys', () => {
        var listSurveyBox = browser.element('.ls-panelboxes .selector__list_surveys');
        listSurveyBox.click();
    });

    When('I try search and see a survey choosed', () => {
        var searchSurveyBox = browser.element('#surveys');
        var searchInput = searchSurveyBox.element('input[name="Survey[searched_value]"]');
        searchInput.click();
        searchInput.keys("Survey MISO - BDT Test");

        var buttonSuccess = browser.element('#surveys .btn-success');
        buttonSuccess.click();

    });

    When('I try to login', () => {
        var cajaLogIn = browser.element('.login-submit');
        cajaLogIn.element('button[name="login_submit"]').click();
    });

    Then('I expect to not be able to login', () => {
        browser.waitForVisible('.alert.alert-danger', 10000);
    });

    Then('I expect to be able to login', () => {
        browser.waitForVisible('#welcome-jumbotron=Esta es la interface de administración de LimeSurvey. Construye tu encuesta desde aquí.', 5000);
    });

    Then('I expect to create survey', () => {
        browser.waitForVisible('button=Structure', 10000);
    });

    Then('I expect to list of surveys', () => {
        browser.waitForVisible('.pagetitle=Lista de encuesta', 10000);
    });

    Then('I expect to search a survey', () => {
        browser.waitForVisible('.pagetitle=Lista de encuesta', 10000);
    });
});