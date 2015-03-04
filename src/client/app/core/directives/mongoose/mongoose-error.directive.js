(function() {

    'use strict';

    /**
     * Removes server error when user updates input
     */

    function mongooseError() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.on('keydown', function() {
                    return ngModel.$setValidity('mongoose', true);
                });
            }
        };
    }

    angular
        .module('app.core.directives')
        .directive('mongooseError', mongooseError);

})();
