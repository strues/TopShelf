(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.users.controller:AdminUsersCtrl
   *
   * @description
   *        ApplicationFactory.getAllApplications().then(function(response) {
            $scope.appGrid.data = response.data;
        });
   */

    function AdminUsersCtrl ($scope, User, $filter, $timeout, $http, $location) {
        $scope.userGrid = {
            data: [],
            columnDefs: [
            {
                field: 'name',
                columnFilter: true,
                displayName: 'Username',
                render: function(user) {
                      return React.DOM.a({href:'javascript:', onClick: function() {
                          $scope.selectUser = user;
                          $location.path('/admin/users/details/' + user._id);
                      }}, user.name);
                  }
            },
            {
                field: 'email',
                displayName: 'Email Address'
            },
            {
                field: 'role',
                columnFilter: true,
                displayName: 'Role'
            }
            ]
        };

        $http.get('/api/users').then(function(response) {
            $scope.userGrid.data = response.data;
        });
    }

    angular
      .module('topshelf.admin.states')
      .controller('AdminUsersCtrl', AdminUsersCtrl);
})();
