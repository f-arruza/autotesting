var assert = require('assert');

describe('e2e testing -> losestudiantes.co', function() {

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('Visitar Los estudiantes y registrar nueva cuenta.', function() {
    browser.url('https://losestudiantes.co');
    browser.click('button=Cerrar');
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');

    var cajaSignUp = browser.element('.cajaSignUp');
    var nombreInput = cajaSignUp.element('input[name="nombre"]');
    nombreInput.click();
    nombreInput.keys('Fernando');

    var apellidoInput = cajaSignUp.element('input[name="apellido"]');
    apellidoInput.click();
    apellidoInput.keys('Arruza');

    var correoInput = cajaSignUp.element('input[name="correo"]');
    correoInput.click();
    correoInput.keys('fernandoarruza@gmail.com');

    var passwordInput = cajaSignUp.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys('xxxxxxxxxx');

    cajaSignUp.element('[type="checkbox"]').click();
    cajaSignUp.element('select[name="idPrograma"]').selectByValue('16')
    cajaSignUp.element('input[name="acepta"]').click();

    browser.click('button=Registrarse');

    browser.waitForVisible('.sweet-alert', 5000);
    var alertText = browser.element('.sweet-alert').element('h2').getText();
    expect(alertText).to.be.equals('Ocurrió un error activando tu cuenta');
  });
});
