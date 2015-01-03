(function () {
    'use strict';

    function NewsListCtrl($scope, PostFactory) {

        PostFactory.getAllPosts().success(function (posts) {

        $scope.posts = posts;

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

    // when x is clicked
        $scope.deletePost = function (postID) {
        console.log('inside posts.controller.js deletePost - postID', postID);
        PostFactory.removePost(postID);
    };
    }

    angular
        .module('topshelf.admin')
        .controller('NewsListCtrl', NewsListCtrl);
})();
