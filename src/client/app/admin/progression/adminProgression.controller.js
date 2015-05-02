(function () {
    'use strict';
    angular
      .module('app.admin')
      .controller('ProgressionModalController', ProgressionModalController)
      .controller('ProgressionCtrl', ProgressionCtrl);
    /* @ngInject */
    function ProgressionCtrl(Progression, $scope, ProgressionModal, toastr, $state) {
        var vm = this;
        Progression.all().success(function (data) {
            vm.processing = false;
            vm.progressionData = data;
        });

        vm.show = ProgressionModal.activate;
    }
    function ProgressionModalController(ProgressionModal, Progression, $stateParams, $state, toastr) {
        var vm = this;
        vm.close = ProgressionModal.deactivate;

        vm.progressionForm = {};
        // get the user data for the user you want to profile.news.edit
        // $routeParams is the way we grab data from the URL
        vm.submit = function (progressionForm) {
          Progression.create(vm.progressionForm).success(function () {
              toastr.success('Grats on the kill', 'Progression updated');
              $state.reload();
          });
      };

    }

}());
