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
    .controller('ApplicationViewCtrl', ApplicationViewCtrl);

  function ApplicationViewCtrl($scope, $http, $stateParams, $location, wowApi) {
  //  var vm = this;
    //vm.ctrlName = 'ApplicationEditCtrl';

    var applicationId = $stateParams.id;

    if(applicationId && applicationId.length > 0) {
        $http.get('/api/applications/' + applicationId)
        .success(function(application) {
          $scope.application = application;

        wowApi.character.items({
          name: application.charName,
          realm: application.charServer
        })
        .then(function (data){
            $scope.data = {};
            $scope.data = data;
        }

        );});
        }


    $scope.saveApplication = function() {
        if(applicationId && applicationId.length > 0) {
            $http.put('/api/applications/' + applicationId,
              $scope.application).success(function(application) {
                $location.path('/admin/applications');
            });
        }
        else {
            $http.post('/api/applications', $scope.application)
              .success(function(application) {
                $location.path('/admin/applications');
            });
        }
    };



    $http.get('/api/applications').success(function(applications) {
      $scope.applicationList = applications;
    });


}

})();
