(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name core.directive:footer
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
     *
     */
    function theFooter() {
        return {
            restrict: 'EA',
            templateUrl: 'app/core/directives/footer/footer.tpl.html',
            controller: 'FooterCtrl'
        };
    }
    angular.module('app.core').directive('theFooter', theFooter);
}());
