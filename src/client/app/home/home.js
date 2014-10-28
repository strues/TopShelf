(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/home/home.tpl.html',
                    controller: 'HomeCtrl'
                });
        });
})();
