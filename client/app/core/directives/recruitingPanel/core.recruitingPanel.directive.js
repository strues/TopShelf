(function () {
    'use strict';

    function recruitingPanel() {
        return {
      templateUrl: 'app/core/directives/recruitingPanel/core.recruitingPanel.tpl.html',
      restrict: 'EA',
      controller: function($scope, Recruitment, $log) {
          Recruitment.all()
            .success(function (data) {
            $scope.recruitments = data;
        }).
        error(function (error) {
            $scope.status = 'Unable to Retrieve Recruitment Status: ' + error.message;
            console.log($scope.status);
        });
      }
    };
    }

    angular
        .module('topshelf.core.directives')
        .directive('recruitingPanel', recruitingPanel);
})();
