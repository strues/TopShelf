(function () {
    'use strict';

    function AdminUsersCtrl(Auth, $http, User, $log, $modal, $scope) {
        //var adminUsers = this;

        $scope.users = [];

        $scope.selectUser = function(user) {
            $scope.user = user;

        };
        $scope.getUsers = function() {
            $http.get('/api/users').then(function(res) {
            $scope.users = res.data;
        });
        };
        $scope.deleteUser = function(index, user) {
            var ask;
            ask = confirm('Delete ' + user.email + '?');
            $http.delete('/api/users/' + user._id).success(function() {
            $http.get('/api/users').success(function(users) {
                $scope.users = users;
            });
        });
        };

        $scope.open = function (size, userID) {

        var modalInstance = $modal.open({
          templateUrl: 'adminUsersModal.html',
          controller: 'AdminUsersCtrl',
           scope: $scope,
        size: 'lg',
          resolve: {
                    user: function () {
                        $scope.user = user._id;
                        $http.get('/api/users/' + user._id).success(function() {

                $scope.users = users;
            });
                        var i = 0;
                        for (; i < $scope.users.length; i++) {
                            if ($scope.users[i]._id === userID) {
                                $scope.user = $scope.users[i];
                                return $scope.user;
                            }
                        }
                    }
                  }
    });

        modalInstance.result.then(function (selectedUser) {
          $scope.selected = selectedUser;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

    }

    angular
        .module('topshelf.admin')
        .controller('AdminUsersCtrl', AdminUsersCtrl);
})();
