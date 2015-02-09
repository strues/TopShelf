(function () {
    'use strict';

    function newsViewModal() {
        return {
          templateUrl: '',
          restrict: 'EA',
          controller: function($scope, Post, $modal, $log) {

            $scope.openViewModal = function (id) {
              var newsViewModal = $modal({
                scope: $scope,
                template: 'app/core/directives/newsView/core.viewModal.tpl.html',
                show: false,

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

            };
            $scope.showModal = function() {
          newsViewModal.$promise.then(newsViewModal.show);
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
        .module('app.core.directives')
        .directive('newsViewModal', newsViewModal);
})();
