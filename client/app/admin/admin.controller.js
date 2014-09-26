'use strict';

angular.module('guildApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, socket) {

    $http.get('/api/users').success(function (users) {
      $scope.users = users;
      socket.syncUpdates('user', $scope.users);
    });

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('user');
    });
  });
