(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name raid.controller:RaidCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function RaidCtrl($scope, Restangular) {

      $scope.save = function () {
        Restangular.all('raids').post($scope.raid).then(function (raid) {
          $location.path('/raid');
        });
      }
  }

function ModalDemoCtrl($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

function ModalInstanceCtrl ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
  angular
    .module('app')
    .controller('RaidCtrl', RaidCtrl)
    .controller('ModalDemoCtrl', ModalDemoCtrl)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

})();