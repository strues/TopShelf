(function () {
  'use strict';
  /**
   * @ngdoc object
   * @name app.admin.controller:UsersCtrl
   */

  angular
    .module('app.admin')
    .controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ['$scope', 'User', '$state', '$http'];
  /* @ngInject */
  function UsersCtrl($scope, User, $state, $http) {
    $http.get('/api/users').then(function (response) {
      $scope.dataForTable = response.data;
    });

    $scope.deleteUser = function (id) {
      $http.delete('/api/users/' + id).then(function () {
        $state.reload();
        Materialize.toast('User Deleted', 3000); // jshint ignore:line
      });
    };
  }

}());
