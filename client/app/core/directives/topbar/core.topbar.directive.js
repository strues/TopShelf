(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name core.directive:topbar
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
        .directive('topbar', topbar);

    function topbar() {
        return {
            restrict: 'EA',
            templateUrl: 'app/core/directives/topbar/core.topbar.tpl.html',
            controller: 'TopBarCtrl',
            controllerAs: 'vm'
        };
    }
})();
