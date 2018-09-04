var assert = require('assert');
describe('los estudiantes login', function() {
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should visit los estudiantes and failed at log in', function () {
        browser.url('https://losestudiantes.co');
        browser.click('button=Cerrar');
        browser.waitForVisible('button=Ingresar', 5000);
        browser.click('button=Ingresar');

        var cajaLogIn = browser.element('.cajaLogIn');
        var mailInput = cajaLogIn.element('input[name="correo"]');

        mailInput.click();
        mailInput.keys('wrongemail@example.com');

        var passwordInput = cajaLogIn.element('input[name="password"]');

        passwordInput.click();
        passwordInput.keys('1234');

        cajaLogIn.element('button=Ingresar').click()
        browser.waitForVisible('.aviso.alert.alert-danger', 5000);

        var alertText = browser.element('.aviso.alert.alert-danger').getText();
        expect(alertText).to.be.equals('Upss! El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.');
    });
});
