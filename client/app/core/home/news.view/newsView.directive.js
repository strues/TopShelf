(function () {
'use strict';


    function newsViewModal() {
      return {
          templateUrl: '',
          restrict: 'EA',
          controller: function($scope, PostFactory, $modal, $log) {

          $scope.openViewModal = function (postID) {
            // the following creates an instance of modal with templateURL, controller, size, and resolve - there are other options listed on UI-Bootstrap Modal site
            var modalInstance = $modal.open({
              templateUrl: 'app/core/home/news.view/viewModal.tpl.html',
              scope: $scope,
              controller: ModalInstanceCtrl,  //controller - a controller for a modal instance - it can initialize scope used by modal. Accepts the "controller-as" syntax, and can be injected with $modalInstance
              size: 'lg',  // changed size: size to size: 'lg', size - optional size of modal window. Allowed values: 'sm' (small) or 'lg' (large). Requires Bootstrap 3.1.0 or later
              // resolve - members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property for AngularJS routes

              resolve: {
                post: function () {
                PostFactory.getPostById(postID)
                .success(function (data) {
                  $scope.status = 'Retrieved Recruitment by ID';
                  // console.log($scope.status);
                  console.log('sidebar.directive.js - resolve - getting data', data);
                  $scope.post = data;
                  console.log('sidebar.directive.js - resolve - assigning data to $scope.recruitment: ',
                    $scope.post);
                }).
                error(function (error) {
                  $scope.status = 'Cannot get current recruitment status: ' + error.message;
                  /// console.log($scope.status);
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
