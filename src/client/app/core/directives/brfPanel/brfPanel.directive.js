(function() {
    'use strict';

    function brfPanel() {
        return {
            templateUrl: 'app/core/directives/brfPanel/brfPanel.tpl.html',
            restrict: 'EA',
            controller: function($scope, Progression, $log) {
                Progression.all()
                    .success(function(data) {
                        $scope.progressions = data;
                    }).
                error(function(error) {
                    $scope.status = 'Unable to retrieve progression information because: ' + error.message;
                    console.log($scope.status);
                });
            }
        };
    }

    angular
        .module('app.core.directives')
        .directive('brfPanel', brfPanel);
})();
