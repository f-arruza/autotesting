function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'http://127.0.0.1:8887/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde();
  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('limesurvey/index.php/admin');

    var userInput = browser.element('input[name="user"]');
    userInput.click();
    userInput.keys('admin');

    var passwordInput = browser.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys('admin');
    
    browser.click('button=Log in');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});
