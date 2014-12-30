(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
    function HomeCtrl(PostFactory, socket) {

        var vm = this;
        vm.posts = {};

        PostFactory.getAllPosts().success(function(posts) {

            vm.posts = posts;
            socket.syncUpdates('post', vm.posts);

            vm.postsLength = posts.length;
            var view = 1;
            var postsQty = 4;
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
      // console.log($scope.status);
    });
    // GuildFactory.getGuildProfile().success(function(response) {
    //   vm.guildProfile = response;
    //   console.log(vm.guildProfile);

    // });

    }

    angular
        .module('topshelf.core')
        .controller('HomeCtrl', HomeCtrl);
})();
