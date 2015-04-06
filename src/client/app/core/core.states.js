(function () {
    'use strict';
    /**
     * @ngdoc object
     * @namespace States
     * @desc Routing for the home page
     * @memberOf app.core
     */
    angular.module('app.core.states').config(config);
    /* @ngInject */
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
        .state('home', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: 'app/core/core-home/home.tpl.html'
                }
            },
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: {
                posts: function(Post) {
                    return Post.all();
                }
            }
        })
        .state('home.detail', {
            url: 'news/:id',
            views: {
                'main@': {
                    templateUrl: 'app/core/core-home/home.details/details.home.tpl.html',
                    controller: function ($stateParams) {

                    }
                }
            },
            resolve: {
                post: function($stateParams, Post) {
                    return Post.get($stateParams.id);
                }
            }
        });
    }
}());
