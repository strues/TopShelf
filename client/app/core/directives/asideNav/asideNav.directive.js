(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name core.directive:asideNav
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
     *
     */
    angular
        .module('app.core.directives')
        .directive('asideNav', asideNav);

    function asideNav() {
        return {
            restrict: 'EA',
            templateUrl: 'app/core/directives/asideNav/asideNav.tpl.html',
            controller: 'AsideNavCtrl',
            controllerAs: 'vm'
        };
    }
})();
