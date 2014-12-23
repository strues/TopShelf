(function () {
'use strict';


    function newsEditModal() {
      return {
          templateUrl: '',
          restrict: 'A',
          controller: function($scope, PostFactory, $modal, $log) {

          $scope.openEditorModal = function (postID) {
            // the following creates an instance of modal with templateURL, controller, size, and resolve - there are other options listed on UI-Bootstrap Modal site
            var modalInstance = $modal.open({
              templateUrl: 'app/admin/news/news.edit/editModal.tpl.html',
              scope: $scope,
              controller: ModalInstanceCtrl,  //controller - a controller for a modal instance - it can initialize scope used by modal. Accepts the "controller-as" syntax, and can be injected with $modalInstance
              size: 'lg',  // changed size: size to size: 'lg', size - optional size of modal window. Allowed values: 'sm' (small) or 'lg' (large). Requires Bootstrap 3.1.0 or later
              // resolve - members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property for AngularJS routes

              resolve: {
                post: function () {
                  var i=0;
                  for(; i<$scope.posts.length; i++) {
                    if($scope.posts[i]._id === postID) {
                      $scope.post = $scope.posts[i];
                      return $scope.post;
                    }
                  }
                }
              }
            });

            modalInstance.result.then(function () {
              // console.log('in modalInstance.result.then #2');
              $log.info('Modal dismissed at: ' + new Date());
            });

           };
          var ModalInstanceCtrl = function ($scope, $modalInstance, post, PostFactory) {

            $scope.updatePost = function (updatedPost) {
              // console.log('ModalInstanceController - $scope.updatePost - postID: ', postID);
              var post = {
                title: $scope.post.title,
                date: $scope.post.date,
                content:  $scope.post.content,
                author: $scope.post.author,
                tags: $scope.post.tags
              };
             PostFactory.updatePost($scope.post)
             .success(function(updatedPost){
          $scope.post = updatedPost;

              $scope.status = 'Updated Post by ID ! Refreshing Post List.';
              console.log('$scope.status', $scope.status);
              alert('Post Updated');
              // $scope.posts.push(post);
              console.log('newsEditModal.directive.js - ModalInstanceController - PostFactory.updatePost(postID, post)', post.tags);
              }).
                error(function (error) {
                $scope.status = 'Unable to Update Post: ' + error.message;
                // console.log('$scope.status', $scope.status);
              });
            };  // end of $scope.updatePost

            $scope.ok = function () {
            // $modalInstance.close($scope.selected.item);
            $modalInstance.close();
            };
            // };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

          };

        }

      };
    }

  angular
    .module('topshelf.admin')
    .directive('newsEditModal', newsEditModal);
})();
