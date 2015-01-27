(function() {
    'use strict';

/**
 * @ngdoc Service
 * @apiName logger
 * @propertyOf topshelf.core.services
 * @description Passes alerts to both toastr as well as the console.
 */

    angular
        .module('topshelf.core.services')
        .factory('logger', logger);

    function logger($log, toastr) {
        return {
          error   : error,
          info    : info,
          success : success,
          warning : warning,
          log     : $log.log
         };

        function error(message, title) {
            toastr.error(message, title, 'error');
            $log.error('Error: ' + message);
        }

        function info(message, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message);
        }

        function success(message, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, 'success');
        }

        function warning(message, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message);
        }
    }

}(this.angular));
