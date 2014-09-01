'use strict';

angular.module('app')
.controller('AppAdminEditCtrl', function ($scope, $stateParams, $location, ApplicationRepository) {
  $scope.application = ApplicationRepository.get($stateParams.id).then(function (data) {
    $scope.application = data;
  });
  $scope.update = function () {
    $scope.application.put().then(function () {
      $location.path('/applications/' + $stateParams.id);
    });
  };
});

