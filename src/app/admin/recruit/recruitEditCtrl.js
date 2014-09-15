(function() {
    'use strict';
    /**
     * Edits the application
     *
     * @param
     * @returns Angular:Controller
     */

    angular
        .module('app')
        .controller('RecruitEditCtrl', RecruitEditCtrl);

    /* @ngInject */
    /*jshint validthis: true */
    function RecruitEditCtrl($scope, $stateParams, $location,$resource, RecruitmentRepository) {
        $scope.recruit = RecruitmentRepository.get($stateParams.id).then(function(data) {
            $scope.recruit = data;
        });

        $scope.alerts = [{
            type: 'danger',
            msg: 'While in beta, please use https://d14ofg6i8akc0o.cloudfront.net/images/CLASSNAME.png for the class image'
        }];

        $scope.addAlert = function() {
            $scope.alerts.push({
                msg: 'Another alert!'
            });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.save = function() {
            $scope.recruit.put().then(function() {
                $location.path('/recruit/' + $stateParams.id);
            });
        };
    }

})();