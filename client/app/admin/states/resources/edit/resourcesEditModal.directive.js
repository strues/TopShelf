(function () {
    'use strict';

    function resourceEditModal() {
        return {
          templateUrl: '',
          restrict: 'A',
          controller: function($scope, ResourceFactory, $modal, $log) {

            $scope.openResourceModal = function (resourceID) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/admin/states/resources/edit/admin.resources-edit.modal.tpl.html',
                    scope: $scope,
                    controller: ModalInstanceCtrl,
                    size: 'lg',

                  resolve: {
                    resource: function () {
                        var i = 0;
                        for (; i < $scope.resources.length; i++) {
                            if ($scope.resources[i]._id === resourceID) {
                                $scope.resource = $scope.resources[i];
                                return $scope.resource;
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

            $scope.updateResource = function (updatedResource) {
              // console.log('ModalInstanceController - $scope.updatePost - resourceID: ', resourceID);
                var resource = {
                    websiteName: $scope.resource.websiteName,
                    websiteUrl: $scope.resource.websiteUrl,
                    websiteType:  $scope.resource.websiteType
                };
                ResourceFactory.updateResource($scope.resource)
                .success(function (updatedResource) {
                    $scope.resource = updatedResource;

                    $scope.status = 'Updating resource by ID ! Refreshing Resource List.';
                    console.log('$scope.status', $scope.status);
                    sweet.show('Resource Changed',
                        'For better or worse, your changes are saved', 'success');
              // $scope.resources.push(resource);
                    console.log('resourceEditModal.directive.js - Resourceactory.updateResource(resourceID, resource)');
                }).
                error(function (error) {
                    $scope.status = 'Unable to Update Resource: ' + error.message;
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
        .directive('resourceEditModal', resourceEditModal);
})();
