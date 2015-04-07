(function () {
    'use strict';
    angular
      .module('app.core')
      .directive('progressionWidget', progressionWidget);
    function progressionWidget() {
        return {
            templateUrl:
            'app/core/directives/progressionWidget/progressionWidget.tpl.html',
            restrict: 'EA',    /* @ngInject */
            controller: function ($scope, Progression, $log) {
                Progression.all().success(function (data) {
                    $scope.progressions = data;
                    $scope.status = data.dead;  //TODO better way to use ng-class?
                }).error(function (error) {
                    $scope.status = 'Unable to retrieve progression info: ' +
                     error.message;
                });
            }
        };
    }
}());
