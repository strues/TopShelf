(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
function HomeCtrl($http, PostFactory, socket) {

    var vm = this;
    vm.ctrlName = 'HomeCtrl';

      PostFactory.getAllPosts().success(function (posts) {
        console.log('getting posts', posts);

        vm.posts = posts;
        socket.syncUpdates('post', vm.posts);

        // display more posts
        vm.postsLength = posts.length;
        var view = 1;
        var postsQty = 6;

        vm.postsShownPerView = function() {
          return view * postsQty;
        };
        vm.getAdditionalPosts = function() {
          return view < (vm.postsLength / postsQty);
        };
        vm.showMorePosts = function() {
          view = view + 1;
        };
    }).
    error(function (error) {
      vm.status = 'Unable to Retrieve Posts: ' + error.message;
    });

    // ng-show/ng-hide
    vm.showMode = false;
  }

    angular
    .module('topshelf.core')
    .controller('HomeCtrl', HomeCtrl);
})();
