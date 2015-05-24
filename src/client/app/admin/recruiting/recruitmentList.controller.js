(function () {
  'use strict';
  /*
   * @ngdoc Controller
   * @name RecruitmentListCtrl
   * @description Logic to display the current admin-recruitment status
   */
  angular
    .module('app.admin')
    .controller('RecruitmentListCtrl', RecruitmentListCtrl);

  RecruitmentListCtrl.$inject = ['$http', 'Recruitment'];
  /* @ngInject */
  function RecruitmentListCtrl($http, Recruitment) {
    var vm = this;
    Recruitment.all().success(function (data) {
      vm.recruitments = data;
    });
    vm.deleteRecruitment = function (recruitment) {
      $http.delete('/api/recruitment/' + recruitment._id)
        .success(function () {
          $http.get('/api/recruitment').success(function (recruitments) {
            vm.recruitments = recruitments;
          });
        });
    };
  }
}());