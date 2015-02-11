(function () {
    'use strict';

  /**
   * @ngdoc controller
   * @name ApplicationListCtrl
   *
   * @description Displays a list of all applications returned in a grid
   *
   */

    angular
      .module('app.admin.states')
      .controller('ApplicationListCtrl', ApplicationListCtrl);
                                    /* @ngInject */
    function ApplicationListCtrl ($scope, Application, toastr, $http, $state, $location) {

        Application.getAllApplications().then(function(response) {
            $scope.dataForTable = response.data;
        });
        $scope.viewAppId = function() {
          $location.path('/admin/applications/view/' + application._id)
        };
       $scope.deleteApplication = function(id) {
          $http.delete('/api/applications' + '/' + id).success(function() {
            $state.reload();
            toastr.success('Hopefully you meant to do that', 'Application Deleted');
          });
        };
        // var dateAsString = $filter('date')($scope.application, 'yyyy-MM-dd');
    }

})();
