(function () {
    'use strict';
    angular
      .module('app.admin.states')
      .controller('ProgressionWidgetCtrl', ProgressionWidgetCtrl);
    function ProgressionWidgetCtrl($scope, Progression, toastr, $filter) {
        Progression.all().success(function (data) {
            $scope.processing = false;
            $scope.progressionData = data;
        }).error(function (error) {
            $scope.status = 'Unable to retrieve progression data: ' +
            error.message;
        });
        $scope.statuses = [
      {
          value: false,
          text: 'Alive'
      },
      {
          value: true,
          text: 'Dead'
      }
    ];
        $scope.showStatus = function () {
            var selected = $filter('filter')($scope.statuses,
              {value: $scope.progression.dead});
            return $scope.progression.dead &&
            selected.length ? selected[0].text : 'Not set';
        };
    }
}());
