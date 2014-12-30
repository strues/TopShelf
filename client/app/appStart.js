(function(angular) {
    'use strict';

  /* @ngdoc object
   * @name appStart
   * @requires app
   *
   * @description
   * The application startup function, called in the app module's run block
   * Created apart from app.js so it can be easily stubbed out
   * during testing or tested independently
   */

    function factory ($rootScope, util) {
        var config = util.config;
        var logger = util.logger;

    }
    angular
        .module('topshelf').factory('appStart', ['$rootScope', 'util', factory]);
})(this.angular);
