(function () {
    'use strict';

    function newsViewModal() {
        return {
          templateUrl: '',
          restrict: 'EA',
          controller: function($scope, Post, $modal, $log) {

            $scope.openViewModal = function (id) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/core/directives/newsView/core.viewModal.tpl.html',
                    scope: $scope,
                    controller: ModalInstanceCtrl,
                    size: 'lg',

              resolve: {
                post: function () {
                    Post.get(id).success(function (data) {
                    $scope.status = 'Retrieved Post';
                }).error(function (error) {
                    $scope.status = 'Cannot get current posts: ' + error.message;
                });
                    return $scope.post;
                }
              }
            });

                modalInstance.result.then(function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };
            var ModalInstanceCtrl = function ($scope, $modalInstance, Post) {

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        };

        }

      };
    }

    angular
        .module('topshelf.core.directives')
        .directive('newsViewModal', newsViewModal);
})();
