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
      aut_version: '1.0.1',
      chromeOptions: {
          args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
      }
    }],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'verbose',

    coloredLogs: true,

    screenshotPath: '/screenshots/',

    baseUrl: 'https://losestudiantes.co',

    waitforTimeout: 10000,

    framework: 'cucumber',

    reporters: ['mochawesome'],

    reporterOptions: {
        outputDir: '/reports/',
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
        timeout: 20000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },
    afterStep: function (stepResult) {
      var path = browser.options.screenshotPath;
      var featureName = stepResult.step.scenario.uri.replace(process.cwd(), "").split("/").join("_").replace(".feature", "");

      var version = browser.options.desiredCapabilities.aut_version;
      var datetime = new Date().getTime();

      if(!fs.existsSync(path + version)) {
        fs.mkdirSync(path + version);
      }
      var fileName = path + version + '/' + browser.options.desiredCapabilities.browserName +
          featureName + '_' + datetime + '.png';
      console.log(fileName);
      browser.saveScreenshot(fileName);
    },
}
