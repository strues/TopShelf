(function () {
    'use strict';

    angular
        .module('topshelf.admin.states')
        .controller('ResourceCreateCtrl', ResourceCreateCtrl);

    function ResourceCreateCtrl($scope, Resource, sweet, Auth) {
        var vm = this;
        vm.processing = true;

        vm.saveResource = function () {
            vm.processing = true;
            vm.message = '';

            Resource.create(vm.resourceData)
            .success(function (data) {
                sweet.show('Resource added to the database', 'success');
                vm.processing = false;
                vm.resourceData = {};
                vm.message = data.message;
            })
            .error(function (error) {
                sweet.show('Oops...', 'Something broke', 'error');
                $scope.status = 'Unable to Create Post: ' + error.message;

            });
        };

    }

})();
