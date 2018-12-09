var fs = require('fs');

exports.config = {
    host: 'hub',
    port: 4444,

    specs: [
        './features/output/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [{
      maxInstances: 5,

      browserName: 'chrome',
      chromeOptions: {
          args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
      }
    }],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'verbose',

    coloredLogs: true,

    screenshotPath: '/screenshots/' + process.env.TEST_PLAN + '/',

    baseUrl: 'http://172.24.41.187/limesurvey/',

    waitforTimeout: 10000,

    framework: 'cucumber',

    reporters: ['mochawesome'],

    reporterOptions: {
        outputDir: '/reports/' + process.env.TEST_PLAN + '/',
        mochawesome_filename: 'webdriverio-behavior-driven-testing.json'
    },

    cucumberOpts: {
        require: ['./features/step-definitions'],        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 50000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    afterStep: function (stepResult) {
      var path = browser.options.screenshotPath;
      var featureName = stepResult.step.scenario.uri.replace(process.cwd(), "").split("/").join("_").replace(".feature", "");
      if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      path = path + 'cucumber' + '/';
      if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      var datetime = new Date().getTime();
      var fileName = path + '/' + browser.options.desiredCapabilities.browserName +
          featureName + '_' + datetime + '.png';
      browser.saveScreenshot(fileName);
    },
}
