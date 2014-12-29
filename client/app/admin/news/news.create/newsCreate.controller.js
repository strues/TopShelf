/*
 * @TODO
 * Bottom portion of the composer page is brokenish
 */

(function () {
  'use strict';

  function NewsCreateCtrl($scope, PostFactory, sweet, socket, Auth) {
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
          sweet.show('Amazing', 'You\'ve written a new post', 'success');
          $scope.status = 'Created Post! Refreshing Post List.';
        }).
        error(function (error) {
         sweet.show('Oops...', 'Something broke', 'error');
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

}
  angular
    .module('topshelf.admin')
    .controller('NewsCreateCtrl', NewsCreateCtrl);
})();
