(function() {
    'use strict';
    /**
     * @ngdoc controller
     * @name ApplicationListCtrl
     *
     * @description Displays a list of all applications returned in a grid
     *
     */
    angular.module('app.admin.states').controller('ApplicationListCtrl', ApplicationListCtrl);
    /* @ngInject */
    function ApplicationListCtrl($scope, Application, toastr, $http, $state, $location) {
        // Application.getAllApplications().then(function (response) {
        //     $scope.dataForTable = response.data;
        // });
        Application.getAllApplications().then(function(response) {
            $scope.dataForTable = response.data;
        });
        $scope.deleteApplication = function(id) {
            $http.delete('/api/applications' + '/' + id).success(function() {
                $state.reload();
                toastr.success('Hopefully you meant to do that', 'Application Deleted');
            });
        };
    }
}());