(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.controller:AdminCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function AdminCtrl($scope, Auth, User) {
 
    $scope.things = [];

  }

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

})();
