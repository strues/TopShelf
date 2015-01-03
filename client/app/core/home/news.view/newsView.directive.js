(function () {
    'use strict';

    function newsViewModal() {
        return {
          templateUrl: '',
          restrict: 'EA',
          controller: function($scope, PostFactory, $modal, $log) {

            $scope.openViewModal = function (postID) {
                var modalInstance = $modal.open({
              templateUrl: 'app/core/home/news.view/viewModal.tpl.html',
              scope: $scope,
              controller: ModalInstanceCtrl,
              size: 'lg',

              resolve: {
                post: function () {
                    PostFactory.getPostById(postID)
                    .success(function (data) {
                    $scope.status = 'Retrieved Recruitment by ID';
                }).
                error(function (error) {
                    $scope.status = 'Cannot get current recruitment status: ' + error.message;
                });  // end of recruitmentFactory.showPost(postID)

                    return $scope.post;
                }
              }
            });

                modalInstance.result.then(function () {
              // console.log('in modalInstance.result.then #2');
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };
            var ModalInstanceCtrl = function ($scope, $modalInstance, PostFactory) {

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
        .module('topshelf.core')
        .directive('newsViewModal', newsViewModal);
})();
