(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl as home
   *
   * @description
   *
   */
    function HomeCtrl(PostFactory, $location) {

        var home = this;
        home.posts = {};

        home.butcherVideo = 'COa86-G8taI';

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
        home.viewMore = function(post) {
            $location.path('/view-post/' + post._id);
        };

    }

    angular
        .module('topshelf.core.states')
        .controller('HomeCtrl', HomeCtrl);
})();
