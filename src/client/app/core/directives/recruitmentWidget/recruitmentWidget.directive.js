(function () {
    'use strict';
    angular
      .module('app.core')
      .directive('recruitmentWidget', recruitmentWidget);

    function recruitmentWidget() {
        return {
            templateUrl:
            'app/core/directives/recruitmentWidget/recruitmentWidget.tpl.html',
            restrict: 'EA',     /* @ngInject */
            controller: function ($scope, Recruitment, $log) {
                Recruitment.all().success(function (data) {
                    $scope.recruitments = data;
                }).error(function (error) {
                    console.log($scope.status);
                });
            }
        };
    }

}());
