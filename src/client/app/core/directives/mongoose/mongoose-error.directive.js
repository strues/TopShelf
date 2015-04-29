(function () {
    'use strict';
    /**
       * Removes server error when user updates input
       */
    function mongooseError() {
        return {
            restrict: 'A',
            require: 'ngModel',
           /* @ngInject */
            link: function (scope, element, attrs, ngModel) {
                element.on('keydown', function () {
                    return ngModel.$setValidity('mongoose', true);
                });
            }
        };
    }
    angular.module('app.core').directive('mongooseError', mongooseError);
}());
