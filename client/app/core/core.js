(function () {
    'use strict';

  /* @ngdoc object
   * @name core
   * @requires $stateProvider
   *
   * @description route
   *
   */

    function config($stateProvider) {

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/core/home/home.tpl.html',
            controller: 'HomeCtrl as home'
        })
        .state('home.view-post', {
            url: 'view-post/:postId',
            templateUrl: 'app/core/home/home.viewPost.tpl.html',
            controller: 'HomeViewPostCtrl as viewPost'
      });
    }

    angular
        .module('topshelf.core')
        .config(config);
})();
