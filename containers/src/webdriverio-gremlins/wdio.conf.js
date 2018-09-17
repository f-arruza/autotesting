exports.config = {
    host: 'hub',
    port: 4444,

    specs: [
        './test/specs/**/*.js'
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

    screenshotPath: './errorShots/',

    baseUrl: 'https://losestudiantes.co',

    waitforTimeout: 10000,

    framework: 'jasmine',

    reporters: ['mochawesome'],

    reporterOptions: {
        outputDir: '/reports/',
        mochawesome_filename: 'webdriverio-random-testing.json'
    },

    jasmineNodeOpts: {
      defaultTimeoutInterval: 80000,
      expectationResultHandler: function(passed, assertion) {
        // do something
      }
    },
};
