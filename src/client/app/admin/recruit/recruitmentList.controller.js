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

  RecruitmentListCtrl.$inject = ['$http', 'recruitSvc'];
  /* @ngInject */
  function RecruitmentListCtrl($http, recruitSvc) {
    var vm = this;

    recruitSvc.list().success(function(data) {
      vm.recruitments = data;
    });
  }
}());
