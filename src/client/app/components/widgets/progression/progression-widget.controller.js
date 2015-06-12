(function () {
  'use strict';
  /**
   * @name ProgressionWidgetCtrl
   * @desc ProgressionWidgetCtrl controller
   * @memberOf app.components
   */
  angular
    .module('app.components')
    .controller('ProgressionWidgetCtrl', ProgressionWidgetCtrl);

  ProgressionWidgetCtrl.$inject = ['$scope', 'Progression'];
  /* @ngInject */
  function ProgressionWidgetCtrl($scope, Progression)  {
    Progression.all().success(function(data) {
      $scope.charData = data;
    });
  }

}());
