(function () {
    'use strict';
    /**
   * @ngdoc object
   * @name admin.admin-users.controller:AdminUsersCtrl
   *
   * @description
   *        ApplicationFactory.getAllApplications().then(function(response) {
            $scope.appGrid.data = response.data;
        });
   */
    /* @ngInject */
    function AdminUsersCtrl($scope, User, toastr, $state, $timeout, $http, $location) {
        $http.get('/api/users').then(function (response) {
            $scope.dataForTable = response.data;
        });
        $scope.deleteUser = function (id) {
            $http.delete('/api/users' + '/' + id).success(function () {
                $state.reload();
                toastr.success('Hopefully you meant to do that', 'User Deleted');
            });
        };
    }
    angular.module('app.admin.states').controller('AdminUsersCtrl', AdminUsersCtrl);
}());
