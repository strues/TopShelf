(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.recruitment.controller:ApplicationListCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.admin')
    .controller('ApplicationEditCtrl', ApplicationEditCtrl);

  function ApplicationEditCtrl($scope, $http, $stateParams, $location) {
  //  var vm = this;
    //vm.ctrlName = 'ApplicationEditCtrl';

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


  }

})();
