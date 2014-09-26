'use strict';

angular.module('guildApp')
  .controller('ApplicationEditCtrl', ['$scope', '$http', '$stateParams','$location', function ($scope, $http, $stateParams, $location) {
    var applicationId = $stateParams.id;
    if(applicationId && applicationId.length > 0) {
        $http.get('/api/applications/' + applicationId).success(function(application) {
          $scope.application = application;
        });
    }

    $scope.saveApplication = function() {
        if(applicationId && applicationId.length > 0) {
            $http.put('/api/applications/' + applicationId, $scope.application).success(function(application) {
                $location.path('/admin/applications')
            });
        }
        else {
            $http.post('/api/applications', $scope.application).success(function(application) {
                $location.path('/admin/applications')
            });
        }
    };

      

    $http.get('/api/applications').success(function(applications) {
      $scope.applicationList = applications;
    });

        
  }]);
