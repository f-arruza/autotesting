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
        browserName: 'chrome'
    },
    {
        browserName: 'firefox'
    }],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'verbose',

    coloredLogs: true,

    screenshotPath: '/screenshots/' + process.env.TEST_PLAN + '/',

    baseUrl: 'https://www.google.com',

    waitforTimeout: 100000,

    framework: 'jasmine',

    reporters: ['mochawesome'],

    reporterOptions: {
        outputDir: '/reports/' + process.env.TEST_PLAN + '/',
        mochawesome_filename: 'webdriverio-headless-testing.json'
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 99999999
    },

    onPrepare: function() {
        // do something
    },

    before: function() {
        var chai = require('chai');
        global.expect = chai.expect;
        chai.Should();
    },

    after: function(failures, pid) {
        // do something
    },

    onComplete: function() {
        // do something
    }
};
