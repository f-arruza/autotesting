var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if(browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When('I open the login screen', () => {
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');
  });

  When(/^I fill with (.*) and (.*)$/ , (email, password) => {
    var cajaLogIn = browser.element('.cajaLogIn');

    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys(email);

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password)
  });

  When('I try to login', () => {
    var cajaLogIn = browser.element('.cajaLogIn');
    cajaLogIn.element('button=Ingresar').click()
  });

  When(/^Fill with (.*), (.*), (.*), (.*) and (.*)$/ , (firstname, lastname, email, password, degree) => {
    var cajaSignUp = browser.element('.cajaSignUp');
    var nameInput = cajaSignUp.element('input[name="nombre"]');
    nameInput.click();
    nameInput.keys(firstname);

    var lastNameInput = cajaSignUp.element('input[name="apellido"]');
    lastNameInput.click();
    lastNameInput.keys(lastname);

    var mailInput = cajaSignUp.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys(email);

    var passwordInput = cajaSignUp.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password);

    cajaSignUp.element('select[name="idPrograma"]').selectByValue(degree);
  });

  Then('I try to create an account {string}' , agreeTerms => {
    var cajaSignUp = browser.element('.cajaSignUp');
    if(agreeTerms=="true")
      cajaSignUp.element('input[name="acepta"]').click();

    browser.click('button=Registrarse');
  });

  Then('I expect to see {string}', error => {
      browser.waitForVisible('.aviso.alert.alert-danger', 5000);
      var alertText = browser.element('.aviso.alert.alert-danger').getText();
      expect(alertText).to.include(error);
  });

  Then('I expect to see user icon',() => {
    browser.waitForVisible('#cuenta', 5000);
    browser.element('#cuenta').click();
  });

  Then('I will see the alert {string}', message => {
    browser.waitForVisible('.sweet-alert', 5000);
    var alert = browser.element('//*[@id="__next"]/div/div/div[1]/div/div/div[2]/div[2]/div').getText()
    expect(alert).to.include(message);
  });

  Then('I will see validate {string}', message => {
    var alert = browser.element('div[role="alert"]').getText()
    expect(alert).to.include(message);
  });

  Then(/^The css (.*) has to be red$/, controlName => {
    var control;
    if(controlName == "name"){
        control = browser.element('/html/body/div[3]/div[2]/div/div/div/div/div/div[1]/div/form/fieldset[1]/div');
    }else if(controlName == "lastname"){
      control = browser.element('/html/body/div[3]/div[2]/div/div/div/div/div/div[1]/div/form/fieldset[2]/div');
    }else if(controlName == "degree"){
      control = browser.element('/html/body/div[3]/div[2]/div/div/div/div/div/div[1]/div/form/div/fieldset[1]');
    }
     control.waitForVisible('.has-error', 1000);
  });

});