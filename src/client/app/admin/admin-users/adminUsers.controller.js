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

    angular
      .module('app.admin.states')
      .controller('AdminUsersCtrl', AdminUsersCtrl);
          /* @ngInject */
    function AdminUsersCtrl($scope, User, toastr, $state, $http, $location) {
        $http.get('/api/users').then(function (response) {
            $scope.dataForTable = response.data;
        });
        $scope.deleteUser = function (id) {
            $http.delete('/api/users' + '/' + id).success(function () {
                $state.reload();
                toastr.success('No going back now', 'User Deleted');
            });
        };
    }

}());
