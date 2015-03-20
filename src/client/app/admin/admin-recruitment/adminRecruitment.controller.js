(function () {
    'use strict';
    /**
     * @ngdoc controller
     * @name app.admin.states.controller:RecruitmentCtrl
     *
     * @description angular-form-for
     *
     */
    angular.module('app.admin.states').controller('RecruitmentCtrl', RecruitmentCtrl);
    RecruitmentCtrl.$inject = [
        '$scope',
        'Recruitment',
        '$state',
        'toastr'
    ];
    /* @ngInject */
    function RecruitmentCtrl($scope, Recruitment, $state, toastr) {
        $scope.formData = {};
        $scope.submit = function (formData) {
            Recruitment.create($scope.formData).success(function () {
                console.log('admin-recruitment status submitted:', $scope.formData);
                toastr.success('The changes to admin-recruitment have been made', 'Status Updated');
                $state.reload();
            });
        };
    }
}());