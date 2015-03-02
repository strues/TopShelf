(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name admin.directive:asideNav
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
     *
     */
    angular
        .module('app.admin.directives')
        .directive('asideNav', asideNav);

    function asideNav() {
        return {
            restrict: 'EA',
            templateUrl: 'app/admin/directives/asideNav/asideNav.tpl.html',
            controller: 'AsideNavCtrl',
            controllerAs: 'vm'
        };
    }
})();
