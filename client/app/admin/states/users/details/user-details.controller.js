(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.recruitment.controller:ApplicationListCtrl
   *
   * @description
   *
   */

    function AdminUserDetailsCtrl($scope, $http, $stateParams, $location) {

    var userId = $stateParams.id;

    if (userId && userId.length > 0) {
        $http.get('/api/users/' + userId)
        .success(function(user) {
            $scope.user = user;
        });
    }

    $scope.saveAUser = function() {
        if (userId && userId.length > 0) {
            $http.put('/api/users/' + userId,
              $scope.user).success(function(user) {
                $location.path('/admin/users/details');
            });
        }
        else {
            $http.post('/api/users', $scope.user)
              .success(function(user) {
                $location.path('/admin/users/details');
            });
        }
    };

    $http.get('/api/users').success(function(users) {
        $scope.users = users;
    });
}
    angular
        .module('topshelf.admin.states')
        .controller('AdminUserDetailsCtrl', AdminUserDetailsCtrl);
})();
