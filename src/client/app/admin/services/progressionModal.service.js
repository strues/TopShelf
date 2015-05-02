(function () {
    'use strict';
    angular
      .module('app.admin')
      .factory('ProgressionModal', ProgressionModal);
    /* @ngInject */
    function ProgressionModal(vModal) {
        return vModal({
            controller: 'ProgressionModalController',
            controllerAs: 'vm',
            templateUrl: 'app/admin/progression/progressionModal.tpl.html'
        });
    }
}());
