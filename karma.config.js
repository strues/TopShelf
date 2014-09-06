module.exports = {
  browsers: ['PhantomJS'],
  frameworks: ['jasmine'],
  files: [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/modernizr/modernizr.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-messages/angular-messages.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-cookies/angular-cookies.js',
  'bower_components/angular-sanitize/angular-sanitize.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/lodash/dist/lodash.compat.js',
  'bower_components/restangular/dist/restangular.js',
  'bower_components/angular-form-for/dist/form-for.js',
  'bower_components/angular-growl/build/angular-growl.js',
  'bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
  'app/app.js',
  'app/common/layout/navbar-controller.js',
  'app/common/auth/user-service.js',
  'app/common/auth/auth-service.js',
  'app/account/account.js',
  'app/account/signup/signup-controller.js',
  'app/account/settings/settings-controller.js',
  'app/account/login/login-controller.js',
  'app/home/home.js',
  'app/home/home-controller.js',
  'app/common/abstract-repository-service.js',
  'app/application/application.js',
  'app/application/application-repository-factory.js',
  'app/application/application-provider.js',
  'app/application/application-controller.js',
  'app/admin/admin.js',
  'app/admin/admin-controller.js',
  'app/account/account-controller.js',
  'app/account/account-controller_test.js',
  'app/admin/admin-controller_test.js',
  'app/application/application-controller_test.js',
  'app/application/application-provider_test.js',
  'app/application/application-repository-factory_test.js',
  'app/home/home-controller_test.js'
  ],
  reporters: ['failed', 'coverage'],
  preprocessors: {
    'app/**/!(*_test)+(.js)': ['coverage'],
    'app/**/*-directive.tpl.haml': ['ng-haml2js'],
    'app/**/*-directive.tpl.html': ['ng-html2js'],
    'app/**/*-directive.tpl.jade': ['ng-jade2js'],
    '**/*.coffee': ['coffee']
  },
  ngHaml2JsPreprocessor: {
    stripPrefix: 'app/'
  },
  ngHtml2JsPreprocessor: {
    stripPrefix: 'app/'
  },
  ngJade2JsPreprocessor: {
    stripPrefix: 'app/'
  },
  singleRun: true
};
