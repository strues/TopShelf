(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name core.directive:navbar
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
     *
     */
    angular.module('app.core').directive('navbar', navbar);
    function navbar() {
        return {
            restrict: 'EA',
            templateUrl: 'app/core/directives/navbar/navbar.tpl.html',
            controller: 'NavbarCtrl',
            controllerAs: 'vm'
        };
    }
}());
