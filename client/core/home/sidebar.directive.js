(function () {
'use strict';

angular
  .module('topshelf.core')
  .directive('sidebar', sidebar);

  function sidebar() {
    return {
      templateUrl: 'core/home/sidebar.tpl.html',
      restrict: 'EA',
      // link: function (scope, element, attrs) {
      // },
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

        // ************************************************ Modal ********************************************************* //

        // removed size from $scope.open = function (size) - will pass in post._id
        $scope.open = function (recruitmentID) {
          console.log('in $scope.open, is $scope.recruitments avail? ', $scope.recruitments);
          console.log('in $scope.open, is recruitmentID? ', recruitmentID);
          // the following creates an instance of modal with templateURL, controller, size, and resolve - there are other options listed on UI-Bootstrap Modal site
          var modalInstance = $modal.open({
            templateUrl: 'core/home/sidebarModal.tpl.html',
            scope: $scope,
            controller: ModalInstanceCtrl,
            size: 'lg',
            // resolve - members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property for AngularJS routes
            resolve: {
              recruitment: function () {
                recruitmentFactory.showRecruitment(recruitmentID)
                .success(function (data) {
                  $scope.status = 'Retrieved Recruitment by ID';
                  // console.log($scope.status);
                  console.log('aside.directive.js - resolve - getting data', data);
                  $scope.recruitment = data;
                  console.log('aside.directive.js - resolve - assigning data to $scope.recruitment: ', $scope.recruitment);
                }).
                error(function (error) {
                  $scope.status = 'Unable to Retrieve Recruitment Status: ' + error.message;
                  /// console.log($scope.status);
                });  // end of recruitmentFactory.showPost(postID)

                return $scope.recruitment;
              }
            }  /* END OF resolve */
          });  /* END OF $model.open */

          modalInstance.result.then(function () {
            // console.log('aside.directive.js - modalInstance.result.then');
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        };  /* END OF $scope.open */

        // post passed from var modalInstance and $modalInstance (built-in) is being used by the controller above to inject var modalInstance
        var ModalInstanceCtrl = function ($scope, $modalInstance, recruitment) {
          //console.log('aside.directive.js - is post avail? ', post);
          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        };
        // ************************************************ END OF Modal ************************************************** //

      }
    };
  };

})();
