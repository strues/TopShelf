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

  RecruitmentListCtrl.$inject = ['$http', 'toastr', '$state', 'recruitSvc'];
  /* @ngInject */
  function RecruitmentListCtrl($http, toastr, $state, recruitSvc) {
    var vm = this;

    recruitSvc.list().success(function(data) {
      vm.recruitments = data;
    });
    vm.deleteRecruitment = function(id) {
      recruitSvc.destroy(id).success(function () {
        toastr.success('Removed');
        $state.reload();
      });
    };

  }
}());
