/**
 * @ngdoc overview
 * @name app.core
 * @description
 * The `app.core` module
 *
 * @requires ui.router
 */
(function () {
    'use strict';
    // register the route config on the application
    angular.module('app.core', [
      'app.account',
      'app.guild',
      'app.admin'
    ]).config(config);
    function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {'main@': {templateUrl: 'app/core/core-home/home.tpl.html'}},
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: {
                posts: function (Post) {
                    return Post.all();
                }
            }
        }).state('home.detail', {
            url: 'news/:id',
            views: {
                'main@': {
                    templateUrl:
                    'app/core/core-home/home.details/details.home.tpl.html',
                    controller: function ($stateParams) {
          }
                }
            },
            resolve: {
                post: function ($stateParams, Post) {
                    return Post.get($stateParams.id);
                }
            }
        });
    }
}());
