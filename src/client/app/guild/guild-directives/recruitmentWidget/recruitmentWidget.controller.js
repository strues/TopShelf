(function () {
  'use strict';
  /**
   * @name RecruitmentWidgetCtrl
   * @desc RecruitmentWidgetCtrl controller
   * @memberOf app.guild
   */
  angular
    .module('app.guild')
    .controller('RecruitmentWidgetCtrl', RecruitmentWidgetCtrl);

  RecruitmentWidgetCtrl.$inject = ['$scope', 'Recruitment'];
  /* @ngInject */
  function RecruitmentWidgetCtrl($scope, Recruitment)  {
    Recruitment.all().success(function (data) {
      $scope.recruitments = data;
    }).error(function (error) {
      console.log($scope.status);
    });
  }
}());
