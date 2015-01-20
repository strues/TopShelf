(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.users.controller:AdminUsersCtrl
   *
   * @description
   *
   */

    function AdminUsersCtrl ($scope, $filter, $timeout, $http, $location) {
        $scope.users = [];
        $http.get('/api/users').success(function(users) {
            $scope.users = users;

        });
        $scope.grid = {
            data: [],
            columnDefs: [
            {
                field: 'name',
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
                displayName: 'Role'
            }
            ],
            localMode: false,
            getData: function() {
                var grid = this;
                $timeout(function() {
                    $http.get('/api/users').success(function(dataSet) {
                        $scope.dataSet = dataSet;

                        $scope.grid.data = dataSet.slice((grid.currentPage - 1) * grid.pageSize,
                            (grid.pageSize * grid.currentPage));
                        $scope.grid.totalCount = dataSet.length;
                    }, 2000);
                });
            }
        };
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
