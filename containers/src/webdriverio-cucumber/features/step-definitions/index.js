var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if(browser.isVisible('.botonCerrar')) {
      browser.element('.botonCerrar').click();
    }
  });

  When('I open the login screen', () => {
    if(browser.isVisible('.modal-body')) {
      browser.waitForVisible('.botonIngresar', 5000);
    }
    browser.waitForVisible('.botonIngresar', 5000);
    browser.element('.botonIngresar').click();
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

  Then('I expect to see {string}', error => {
    if(error == 'SUCESS_FLAG') {
      browser.waitForVisible('button[id="cuenta"]', 5000);
      expect(browser.isVisible('button[id="cuenta"]')).to.be.equals(true);
    }
    else {
      browser.waitForVisible('.aviso.alert.alert-danger', 5000);
      var alertText = browser.element('.aviso.alert.alert-danger').getText();
      expect(alertText).to.include(error);
    }
  });

  // Register
  When('I open the register screen', () => {
    if(browser.isVisible('.modal-body')) {
      browser.waitForVisible('.botonIngresar', 5000);
    }
    browser.waitForVisible('.botonIngresar', 5000);
    browser.element('.botonIngresar').click();
  });

  When(/^I fill SignUp with (.*), (.*), (.*), (.*) and (.*)$/ , (name, lastname, email, password, accept) => {
    browser.waitForVisible('.cajaSignUp', 5000);

    var cajaSignUp = browser.element('.cajaSignUp');
    var nombreInput = cajaSignUp.element('input[name="nombre"]');
    nombreInput.click();
    nombreInput.keys(name);

    var apellidoInput = cajaSignUp.element('input[name="apellido"]');
    apellidoInput.click();
    apellidoInput.keys(lastname);

    var correoInput = cajaSignUp.element('input[name="correo"]');
    correoInput.click();
    correoInput.keys(email);

    var passwordInput = cajaSignUp.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password);

    cajaSignUp.element('[type="checkbox"]').click();
    cajaSignUp.element('[name="idPrograma"]').selectByValue('16')
    if(accept == 'true') {
      cajaSignUp.element('input[name="acepta"]').click();
    }
  });

  When('I try to register', () => {
    browser.click('button=Registrarse');
  });

  Then(/^I expect (.*)$/ , (behavior) => {
    // Nombre y apellidos
    if(behavior.startsWith('E:')) {
      expect(browser.isVisible('.glyphicon-remove')).equal(true);
    }
    // Errores en ingreso de datos
    if(behavior.startsWith('A:')) {
      var msg = behavior.replace('A:', '');
      var alertText = browser.element('.alert-danger').getText();
      expect(alertText).to.include(msg);
    }
    // Usuario Repetido
    if(behavior.startsWith('R:')) {
      browser.waitForVisible('.sweet-alert', 5000);
      var alertText = browser.element('.sweet-alert').element('h2').getText();
      expect(alertText).to.include('Ocurrió un error activando tu cuenta');
    }
    // Usuario Repetido
    if(behavior.startsWith('RF:')) {
      browser.waitForVisible('.sweet-alert', 5000);
      var alertText = browser.element('.sweet-alert').element('h2').getText();
      expect(alertText).to.include('Ocurrió un error activando tu cuenta');
    }
    // Usuario Exitoso
    if(behavior.startsWith('RE:')) {
      browser.waitForVisible('.sweet-alert', 5000);
      var alertText = browser.element('.sweet-alert').element('h2').getText();
      expect(alertText).to.include('Registro exitoso');
    }
  });
});
