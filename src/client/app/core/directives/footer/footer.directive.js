(function() {
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
            controller: 'FooterCtrl',
            controllerAs: 'vm'
        };
    }

    angular
        .module('app.core.directives')
        .directive('theFooter', theFooter);
})();
