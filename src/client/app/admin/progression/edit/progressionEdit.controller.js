(function () {
    'use strict';
    angular
      .module('app.admin')
      .controller('ProgressionEditController', ProgressionEditController);
    /* @ngInject */
    function ProgressionEditController(Progression, $state, $stateParams, toastr) {
        /*jshint validthis: true */
        var vm = this;

        Progression.get($stateParams.progressionId).success(function (data) {
            vm.progressionData = data;
        });

        vm.progressionData = {};
        // function to save the user
        vm.saveProgression = function () {
            vm.processing = true;
            vm.message = '';
            // call the userService function to update
            Progression.update($stateParams.progressionId, vm.progressionData)
            .success(function (data) {
                vm.processing = false;
                // clear the form
                vm.progressionData = {};
                // bind the message from our API to vm.message
                vm.message = data.message;
                $state.go('admin');
            });
        };
    }
}());
