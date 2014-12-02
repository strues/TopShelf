/*
 * @TODO
 * Bottom portion of the composer page is brokenish
 */

(function () {
  'use strict';

  angular
    .module('topshelf.admin')
    .controller('NewsCtrl', NewsCtrl);

    function NewsCtrl($scope, PostFactory, toastr, socket, Auth) {

      // *************************************************** UI- TinyMCE ************************************************************* //

      $scope.tinymceOptions = {
        resize: false,
        height: 400,
        plugins: 'print textcolor image link hr wordcount code', // removed spellchecker for now
        toolbar: 'undo redo | styleselect | bold italic | print | forecolor backcolor | hr | bullist | image link | code'
      };

      // ************************************************ END OF UI- TinyMCE ********************************************************* //


      // get all posts which will display below editor area
    PostFactory.getAllPosts()
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
        author: Auth.currentUser,
        tags: $scope.newPost.tags
      };

      // data to postsFactory service
      PostFactory.createPost(post)
        .success(function () {
          toastr.success('News entry submitted');
          $scope.status = 'Created Post! Refreshing Post List.';
          //console.log('$scope.status', $scope.status);
          // $scope.posts.push(post);
        }).
        error(function (error) {
          toastr.error('An erorr has occured:' + error.message);
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
      toastr.info('Deleted post');
      PostFactory.deletePost(postID);
    };
    }
})();
