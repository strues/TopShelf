/*
 * @TODO
 * Bottom portion of the composer page is brokenish
 */

(function () {
  'use strict';

  angular
    .module('topshelf.admin')
    .controller('NewsListCtrl', NewsListCtrl);

    function NewsListCtrl($scope, postsFactory, socket, Auth) {
        // get all posts which will display below editor area
    postsFactory.getPosts()
    .success(function (posts) {

      $scope.posts = posts;
      socket.syncUpdates('post', $scope.posts);

      // display more posts
      $scope.postsLength = posts.length;
      var view = 1;
      var postsQty = 4;
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
      // console.log($scope.status);
    });

    // ng-show/ng-hide
    $scope.showMode = false;

    // when Save is clicked
    $scope.createPost = function () {

      var post = {
        date: $scope.newPost.date,
        title: $scope.newPost.title,
        content:  $scope.newPost.content,
        author: $scope.newPost.author,
        tags: $scope.newPost.tags
      }

      // data to postsFactory service
      postsFactory.createPost(post)
        .success(function () {
          $scope.status = 'Created Post! Refreshing Post List.';
          //console.log('$scope.status', $scope.status);
          // $scope.posts.push(post);
        }).
        error(function (error) {
          $scope.status = 'Unable to Create Post: ' + error.message;
          //console.log('$scope.status', $scope.status);
        });

      // reset inputs
      $scope.newPost.title = '';
      $scope.newPost.date = '';
      $scope.newPost.content = '';
      $scope.newPost.author = '';
      $scope.newPost.tags = '';

    }; // end of $scope.createPost

    // when x is clicked
    $scope.deletePost = function (postID) {
      console.log('inside posts.controller.js deletePost - postID', postID);
      postsFactory.deletePost(postID);
    };
    }
})();
