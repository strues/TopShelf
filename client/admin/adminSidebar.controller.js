(function () {
  'use strict'

  angular
    .module('topshelf.admin')
    .controller('AdminSidebarCtrl', AdminSidebarCtrl);

    function AdminSidebarCtrl($scope) {
        $scope.oneAtATime = true;



  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
    }
})();
