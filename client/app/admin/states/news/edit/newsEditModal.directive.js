(function () {
    'use strict';

    function newsEditModal() {
        return {
          templateUrl: '',
          restrict: 'A',
          controller: function($scope, PostFactory, $modal, $log) {

            $scope.openEditorModal = function (postID) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/admin/states/news/edit/admin.news-edit.modal.tpl.html',
                    scope: $scope,
                    controller: ModalInstanceCtrl,
                    size: 'lg',

                  resolve: {
                    post: function () {
                        var i = 0;
                        for (; i < $scope.posts.length; i++) {
                            if ($scope.posts[i]._id === postID) {
                                $scope.post = $scope.posts[i];
                                return $scope.post;
                            }
                        }
                    }
                  }
            });

                modalInstance.result.then(function () {
              // console.log('in modalInstance.result.then #2');
                    $log.info ('Modal dismissed at: ' + new Date());
                });

            };
            var ModalInstanceCtrl = function ($scope, $modalInstance, PostFactory, sweet) {

            $scope.updatePost = function (updatedPost) {
              // console.log('ModalInstanceController - $scope.updatePost - postID: ', postID);
                var post = {
                    title: $scope.post.title,
                    date: $scope.post.date,
                    content:  $scope.post.content,
                    author: $scope.post.author,
                    tags: $scope.post.tags,
                    image: $scope.post.image
                };
                PostFactory.updatePost($scope.post)
                .success(function (updatedPost) {
                    $scope.post = updatedPost;

                    $scope.status = 'Updated Post by ID ! Refreshing Post List.';
                    console.log('$scope.status', $scope.status);
                    sweet.show('Post Changed',
                        'For better or worse, your changes are saved', 'success');
              // $scope.posts.push(post);
                    console.log('newsEditModal.directive.js - PostFactory.updatePost(postID, post)',
                        post.tags);
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
        .module('topshelf.admin.states')
        .directive('newsEditModal', newsEditModal);
})();
