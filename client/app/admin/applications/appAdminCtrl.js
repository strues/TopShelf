'use strict';

angular.module('app')
.controller('AppAdminCtrl', function ($scope, ApplicationRepository) {
  $scope.applications = ApplicationRepository.getList();
  $scope.delete = function (data) {
    if(window.confirm('Are you sure?')) {
      ApplicationRepository.remove(data).then(function () {
          $scope.applications = ApplicationRepository.getList();
        });
    }
  };
})
.controller('AppAdminItemCtrl', function ($scope, $stateParams, ApplicationRepository) {
  $scope.application = ApplicationRepository.get($stateParams.id).then(function (data) {
    $scope.application = data;
  });
});


