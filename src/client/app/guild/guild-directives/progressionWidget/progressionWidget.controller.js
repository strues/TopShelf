(function () {
  'use strict';
  /**
   * @name ProgressionWidgetCtrl
   * @desc ProgressionWidgetCtrl controller
   * @memberOf app.guild
   */
  angular
    .module('app.guild')
    .controller('ProgressionWidgetCtrl', ProgressionWidgetCtrl);

  ProgressionWidgetCtrl.$inject = ['$scope', 'Progression'];
  /* @ngInject */
  function ProgressionWidgetCtrl($scope, Progression)  {
    Progression.all().success(function(data) {
      $scope.charData = data;
    });
  }
}());
