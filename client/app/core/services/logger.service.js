/**
 * logger.js in web
 */
/*
 * Semantic logging service that passes messages both to
 * ngToast (pop-up messages) and the console (via Angular's $log)
 */

(function() {

  'use strict';

  function logger( $log, toastr ) {
    return {
      error   : error,
      info    : info,
      success : success,
      warning : warning,
      log     : $log.log
    };
    /////////////////////
    function error(message, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message);
    }

    function info(message, title) {
      toastr.info(message, title);
      $log.info('Info: ' + message);
    }

    function success(message, title) {
      toastr.success(message, title);
      $log.info('Success: ' + message);
    }

    function warning(message, title) {
      toastr.warning(message, title);
      $log.warn('Warning: ' + message);
    }

  }

angular
  .module('topshelf.core')
  .factory('logger', logger);

}( this.angular ));
