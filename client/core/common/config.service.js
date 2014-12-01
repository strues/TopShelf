/**
 * config.service.js.js in web
 */
/*
 * Provides configuration values used widely in the app
 * Also configures 'toastr', the pop-up message component
 */
(function() {
  'use strict';

  function config($rootScope) {

    return {
      version             : $rootScope.version = '0.8.0',
      debug               : true,
      httpTimeout         : 2500,
      server              : 'Express',
      serviceName         : 'topshelf',
      devServiceName      : 'topshelf/dev',
      reportStateChanges  : true,
      userSessionId       : '0'
    };
  }

angular
  .module('topshelf.core')
  .factory('config', config);
}());
