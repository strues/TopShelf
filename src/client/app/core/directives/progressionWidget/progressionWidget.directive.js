(function () {
    'use strict';
    angular
        .module('app.core.directives')
        .directive('progressionWidget', progressionWidget);

    function progressionWidget() {
        return {
            templateUrl: 'app/core/directives/progressionWidget/progressionWidget.tpl.html',
            restrict: 'EA',
            controller: function ($scope, Progression, $log) {
                Progression.all().success(function (data) {
                    $scope.progressions = data;
                    $scope.status = data.dead;    //TODO better way to use ng-class?
                }).error(function (error) {
                    $scope.status = 'Unable to retrieve progression information because: ' + error.message;
                    console.log($scope.status);
                });
            }
        };
    }

}());
