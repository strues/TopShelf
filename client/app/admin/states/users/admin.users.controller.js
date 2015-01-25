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
   /* $scope.selectUser = function(user) {
        $location.path('/admin/users/details/' + user._id);
    };
      $scope.deleteUser = function(user) {
          $http.delete('/api/users/' + user._id).success(function() {
            $http.get('/api/users').success(function(users) {
                $scope.users = users;
            });
        });
      };

      $scope.getUserById = function(id) {
            var results = jQuery.grep($scope.user, function(user, i) { // jshint ignore:line
                return (user._id === id);
            });
            return results[0];
        };

      $scope.addNew = function() {
        $location.path('/admin/users/view');
    };
      var dateAsString = $filter('date')($scope.user, 'yyyy-MM-dd');*/
