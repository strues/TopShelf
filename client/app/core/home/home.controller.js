(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl as home
   *
   * @description
   *
   */
    function HomeCtrl(PostFactory) {

        var home = this;
        home.posts = {};

        PostFactory.getAllPosts().success(function(posts) {

            home.posts = posts;

            home.postsLength = posts.length;
            var view = 1;
            var postsQty = 4;
            home.postsShownPerView = function() {
                return view * postsQty;
            };
            home.getAdditionalPosts = function() {
                return view < (home.postsLength / postsQty);
            };
            home.showMorePosts = function() {
                view = view + 1;
            };
        }).
        error(function (error) {
        home.status = 'Unable to Retrieve Posts: ' + error.message;
    });

    }

    angular
        .module('topshelf.core')
        .controller('HomeCtrl', HomeCtrl);
})();
