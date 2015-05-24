(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @module app.common
   * @name passwordMatch
   * @restrict E
   * @scope true
   * @description < description placeholder >
   */

  angular
    .module('app.common')
    .directive('passwordMatch', passwordMatch);

  /* @ngInject */
  function passwordMatch() {

    return {
      link: link,
      require: 'ngModel',
      scope: {
        otherModelValue: '=passwordMatch'
      }
    };

    /////////////////////

    function link(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue === scope.otherModelValue;
      };
      scope.$watch('otherModelValue', function() {
        ngModel.$validate();
      });
    }
  }

}());
