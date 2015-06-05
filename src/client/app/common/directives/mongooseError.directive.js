/**
 * @ngdoc directive
 * @module app.common
 * @name mongooseError
 * @restrict A
 * @scope true
 * @description Removes server error when user updates input
 */

(function() {
  'use strict';

  angular
    .module('app.common')
    .directive('mongooseError', mongooseError);

  /* @ngInject */
  function mongooseError() {

    return {
      link: link,
      restrict: 'A',
      require: 'ngModel'
    };

    /////////////////////

    function link(scope, element, attrs, ngModel) {
      element.on('keydown', function() {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  }
}());
