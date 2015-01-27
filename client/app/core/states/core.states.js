(function () {
    'use strict';

  /**
   * @ngdoc object
   * @namespace States
   * @desc Routing for the home page
   * @memberOf topshelf.core
   */

    angular
        .module('topshelf.core.states')
        .config(config);
            /* @ngInject */
    function config($stateProvider) {

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/core/states/home/core.home.tpl.html',
            controller: 'HomeCtrl as vm'
        })
        .state('home.view-post', {
            url: 'view-post/:postId',
            templateUrl: 'app/core/states/home/view-post/core.home.viewPost.tpl.html',
            controller: 'HomeViewPostCtrl as viewPost'
        });
    }

})();
