(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name app.admin.states.controller:RecruitmentCtrl
       *
       * @description angular-form-for
       *
       */
    angular
      .module('app.admin')
      .controller('RecruitmentController', RecruitmentController);

    /* @ngInject */
    function RecruitmentController($scope, Recruitment, $state, toastr) {
        $scope.formData = {};
        $scope.submit = function (formData) {
            Recruitment.create($scope.formData).success(function () {
                console.log('admin-recruitment status submitted:',
                  $scope.formData);
                toastr.success('Recruitment changed', 'Status Updated');
                $state.reload();
            });
        };
    }
}());
