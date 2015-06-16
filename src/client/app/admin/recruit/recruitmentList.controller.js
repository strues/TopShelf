(function() {
  'use strict';
  /*
   * @ngdoc Controller
   * @name RecruitmentListCtrl
   * @description Logic to display the current admin-recruitment status
   */
  angular
    .module('app.admin')
    .controller('RecruitmentListCtrl', RecruitmentListCtrl);

  RecruitmentListCtrl.$inject = ['$http', 'ngToast', '$state', 'recruitSvc'];
  /* @ngInject */
  function RecruitmentListCtrl($http, ngToast, $state, recruitSvc) {
    var vm = this;

    recruitSvc.list().success(function(data) {
      vm.recruitments = data;
    });
    vm.deleteRecruitment = function(id) {
      recruitSvc.destroy(id).success(function () {
        ngToast.create('Removed');
        $state.reload();
      });
    };
    recruitSvc.listThreads().success(function(data) {
      vm.threads = data;
    });
    vm.deleteThread = function(id) {
      recruitSvc.destroyThread(id).success(function () {
        ngToast.create('Removed');
        $state.reload();
      });
    };

  }
}());
