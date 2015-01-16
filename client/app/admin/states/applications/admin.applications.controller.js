(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.recruitment.controller:ApplicationListCtrl
   *
   * @description
   *
   */

    function ApplicationListCtrl ($scope, $filter, $http, $location) {
      $http.get('/api/applications').success(function(applications) {
      $scope.applications = applications;

  });
      $scope.selectApplication = function(application) {
        $location.path('/admin/applications/view/' + application._id);
    };
      $scope.deleteApplication = function(application) {
        $http.delete('/api/applications/' + application._id).success(function() {
            $http.get('/api/applications').success(function(applications) {
                $scope.applications = applications;
            });
        });
    };

      $scope.getApplicationById = function(id) {
            var results = jQuery.grep($scope.application, function(application, i) { // jshint ignore:line
                return (application._id === id);
            });
            return results[0];
        };

      $scope.addNew = function() {
        $location.path('/admin/applications/view');
    };
      var dateAsString = $filter('date')($scope.application, 'yyyy-MM-dd');
  }

    angular
      .module('topshelf.admin.states')
      .controller('ApplicationListCtrl', ApplicationListCtrl);
})();
