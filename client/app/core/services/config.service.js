/**
 * config.service.js.js in web
 */

(function() {
  'use strict';

  function config($rootScope) {

    return {
      version             : $rootScope.version = '0.8.0',
      debug               : true,
      httpTimeout         : 2500,
      server              : 'tears',
      serviceName         : 'topshelf',
      devServiceName      : 'topshelf/dev',
      reportStateChanges  : true,
      userSessionId       : '1'
    };
  }

angular
  .module('topshelf.core')
  .factory('config', config);
}());
