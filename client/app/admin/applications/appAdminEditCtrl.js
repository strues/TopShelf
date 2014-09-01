'use strict';

angular.module('app')
  .controller('AppAdminCtrl', function ($scope, Restangular, application, $location) {
   
 var original = application;
    $scope.application = Restangular.copy(original);
    

    $scope.isClean = function() {
      return angular.equals(original, $scope.application);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/list');
      });
    };

    $scope.save = function() {
      $scope.application.put().then(function() {
        $location.path('/');
      });
    };
  
  });

