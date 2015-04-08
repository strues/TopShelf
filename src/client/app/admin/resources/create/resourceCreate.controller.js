(function () {
    'use strict';
    /*
       * @ngdoc Controller
       * @name ResourceCreateCtrl
       */
    angular
      .module('app.admin')
      .controller('ResourceCreateController', ResourceCreateController);
    /* @ngInject */
    function ResourceCreateController($scope, Resource, toastr, Auth) {
        var vm = this;
        vm.processing = true;
        vm.toggle = false;
        vm.saveResource = function () {
            vm.processing = true;
            vm.message = '';
            Resource.create(vm.resourceData).success(function (data) {
                toastr.success('Saved to the database', 'Submitted!');
                vm.processing = false;
                vm.resourceData = {};
                vm.message = data.message;
            }).error(function (error) {
                toastr.error('Unable to Create Post' + error.message, 'Error');
                $scope.status = 'Unable to Create Post: ' + error.message;
            });
        };
    }
}());
