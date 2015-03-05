(function() {
    'use strict';

    /**
     * @ngdoc object
     * @namespace States
     * @desc Routing for the home page
     * @memberOf app.core
     */

    angular
        .module('app.core.states')
        .config(config);
    /* @ngInject */
    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/core/core-home/home.tpl.html',
                controller: 'HomeCtrl as vm'
            })
            .state('viewPost', {
                url: '/news/:id',
                templateUrl: 'app/core/core-home/home.details/details.home.tpl.html',
                controller: function($stateParams) {
                    console.log($stateParams);
                }
            });
    }

})();
