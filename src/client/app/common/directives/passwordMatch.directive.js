/**
* @ngdoc directive
* @name app.common.directive:passwordMatch
* @scope true
* @restrict A
*
* @description Indicator showing whether or not two passwords match
*
*/

(function() {
  'use strict';

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
