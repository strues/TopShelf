(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name admin.states.controller:DatepickerCtrl
       *
       * @description datepicker functionality
       *
       */
    angular
      .module('app.admin.states')
      .controller('DatepickerCtrl', DatepickerCtrl);
          /* @ngInject */
    function DatepickerCtrl($scope) {
        $scope.selectedDate = new Date();
        $scope.selectedDateAsNumber = Date.UTC(1986, 1, 22);
        $scope.getType = function (key) {
            return Object.prototype.toString.call($scope[key]);
        };
        $scope.clearDates = function () {
            $scope.selectedDate = null;
        };
    }
}());
