(function () {
    'use strict';
    function recruitmentWidget() {
        return {
            templateUrl: 'app/core/directives/recruitmentWidget/recruitmentWidget.tpl.html',
            restrict: 'EA',
            controller: function ($scope, Recruitment, $log) {
                Recruitment.all().success(function (data) {
                    $scope.recruitments = data;
                }).error(function (error) {
                    console.log($scope.status);
                });
            }
        };
    }
    angular.module('app.core').directive('recruitmentWidget', recruitmentWidget);
}());
