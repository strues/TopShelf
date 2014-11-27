(function () {
    'use strict';

function sidebar() {
    return {
      templateUrl: 'core/home/sidebar.tpl.html',
      restrict: 'EA',
      controller: function($scope, recruitmentFactory, socket, $modal, $log) {
        recruitmentFactory.getRecruitment()
        .success(function (recruitments) {
          $scope.recruitments = recruitments;
          //console.log('aside - postsFactory.getPosts()', posts);
          socket.syncUpdates('recruitment', $scope.recruitments);
        }).
        error(function (error) {
          $scope.status = 'Unable to Retrieve Recruitment Status: ' + error.message;
          console.log($scope.status);
        });
        $scope.open = function (recruitmentID) {
          console.log('in $scope.open, is $scope.recruitments avail? ', $scope.recruitments);
          console.log('in $scope.open, is recruitmentID? ', recruitmentID);
          var modalInstance = $modal.open({
            templateUrl: 'core/home/sidebarModal.tpl.html',
            scope: $scope,
            controller: ModalInstanceCtrl,
            size: 'lg',
            resolve: {
              recruitment: function () {
                recruitmentFactory.showRecruitment(recruitmentID)
                .success(function (data) {
                  $scope.status = 'Retrieved Recruitment by ID';
                  // console.log($scope.status);
                  console.log('sidebar.directive.js - resolve - getting data', data);
                  $scope.recruitment = data;
                  console.log('sidebar.directive.js - resolve - assigning data to $scope.recruitment: ',
                    $scope.recruitment);
                }).
                error(function (error) {
                  $scope.status = 'Cannot get current recruitment status: ' + error.message;
                  /// console.log($scope.status);
                });  // end of recruitmentFactory.showPost(postID)

                return $scope.recruitment;
              }
            }
          });

          modalInstance.result.then(function () {
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance) {
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
  .module('topshelf.core')
  .directive('sidebar', sidebar);
})();
