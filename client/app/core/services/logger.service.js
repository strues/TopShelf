/**
 * logger.js in web
 */
/*
 * Semantic logging service that passes messages both to
 * ngToast (pop-up messages) and the console (via Angular's $log)
 */

(function() {

    'use strict';

    function logger($log, sweet) {
        return {
      error   : error,
      info    : info,
      success : success,
      warning : warning,
      log     : $log.log
    };
    /////////////////////
        function error(message, title) {
            sweet.show(message, title, 'error');
            $log.error('Error: ' + message);
        }

        function info(message, title) {
            sweet.show(message, title);
            $log.info('Info: ' + message);
        }

        function success(message, title) {
            sweet.show(message, title);
            $log.info('Success: ' + message, 'success');
        }

        function warning(message, title) {
            sweet.show(message, title);
            $log.warn('Warning: ' + message);
        }

    }

    angular
        .module('topshelf.core')
        .factory('logger', logger);

}(this.angular));
