module.exports = function(config) {
  config.set({
    mutate: ["js/**/*.js"],
    mutator: "javascript",
    testRunner: "karma",
    files: [
      // 'node_modules/angular/angular.js',
			// 'node_modules/angular-route/angular-route.js',
			// 'node_modules/angular-resource/angular-resource.js',
			// 'node_modules/angular-mocks/angular-mocks.js',
      'js/**/*.js',
      'test/**/*.js',
      'karma.conf.js',
      'stryker.conf.js'
    ],
    // symlinkNodeModules: false,
    karma: {
      configFile: "karma.conf.js",
      config: {
        browsers: ['ChromeHeadless']
      }
    },
    reporters: ["html", "clear-text", "progress"],
    testFramework: 'jasmine',
    coverageAnalysis: 'off',
    logLevel: 'debug'
    // maxConcurrentTestRunners: 4,
  });
};
