(function() {


'use strict';

angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

   function HomeCtrl($scope, $http, postsFactory, socket) {
      postsFactory.getPosts()
    .success(function (posts) {
    console.log('main.controller.js - postsFactory.getPosts() - posts:', posts);

      $scope.posts = posts;
      socket.syncUpdates('post', $scope.posts);

      // display more posts
      $scope.postsLength = posts.length;
      var view = 1;
      var postsQty = 6;
      $scope.postsShownPerView = function() {
        return view * postsQty;
      };
      $scope.getAdditionalPosts = function() {
        return view < ($scope.postsLength / postsQty);
      };
      $scope.showMorePosts = function() {
        view = view + 1;
      };
    }).
    error(function (error) {
      $scope.status = 'Unable to Retrieve Posts: ' + error.message;
    });

    // ng-show/ng-hide
    $scope.showMode = false;
  }
})();
