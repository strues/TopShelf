(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name admin.states.controller:AdminUserDetailsCtrl
       *
       * @description shows the admin-users account-profile
       *
       */
    angular
      .module('app.admin')
      .controller('UserDetailsController', UserDetailsController);
    /* @ngInject */
    function UserDetailsController($scope, $http, User, $stateParams, $filter) {
        var vm = this;
        var userId = $stateParams.id;
        if (userId && userId.length > 0) {
            $http.get('/api/users/' + userId).success(function (user) {
                $scope.user = user;
            });
        }
        $http.get('/api/users').success(function (data) {
            $scope.userData = data;
        });
        $scope.roles = [
      {
          value: 'user',
          text: 'User'
      },
      {
          value: 'admin',
          text: 'Admin'
      }
    ];
        $scope.saveUser = function () {
            // $scope.user already updated!
            return $http.put('/api/users/' + userId, $scope.user)
            .error(function (err) {
                if (err.field && err.msg) {
                    $scope.editableForm.$setError(err.field, err.msg);
                } else {
                    // unknown error
                    $scope.editableForm.$setError('name', 'Unknown error!');
                }
            });
        };
    }
}());
