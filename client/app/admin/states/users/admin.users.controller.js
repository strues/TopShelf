(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.users.controller:AdminUsersCtrl
   *
   * @description
   *
   */

    function AdminUsersCtrl ($scope, $filter, $http, $location) {
      $http.get('/api/users').success(function(users) {
          $scope.users = users;

      });
      $scope.selectUser = function(user) {
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
      var dateAsString = $filter('date')($scope.user, 'yyyy-MM-dd');
  }

    angular
      .module('topshelf.admin.states')
      .controller('AdminUsersCtrl', AdminUsersCtrl);
})();
