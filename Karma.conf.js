module.exports = function(config) {
config.set({

	   // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',   //'../',

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular/angular.*.js',
      		'node_modules/angular-mocks/angular-mocks.js',
            //'node_modules/karma-ng-html2js-preprocessor/*.js',
            'app/*.js',
            'testA/*Test.js',
            //'app/*.html'
            'app/*.html'
        ],

        exclude: [
 /*           'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'*/
        ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

 		// enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor'  //IMP... for Depenedancies like below
                                            //    ['ng-html2js']
        ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/*.html': ['ng-html2js']
    },

// we will be accessing this by module name later on in Jasmine
ngHtml2JsPreprocessor: {
    stripPrefix: 'app/',
    moduleName: 'templates'
},



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//    reporters: ['spec'],

    

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
}