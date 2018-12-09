module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-mocks/angular-mocks.js',
      'js/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'js/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: '/reports/' + process.env.TEST_PLAN + '/stryker/coverage/',
      reporters: [
        { type: 'html', subdir: '.' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
}
