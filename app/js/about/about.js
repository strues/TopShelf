(function() {

    'use strict';

    function config ($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'js/about/about.tpl.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            });
    }

    angular
        .module('app')
        .config(config);
})();