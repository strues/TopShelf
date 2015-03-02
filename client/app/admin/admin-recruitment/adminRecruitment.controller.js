(function () {
    'use strict';

  /**
   * @ngdoc controller
   * @name RecruitmentCtrl
   *
   * @description angular-form-for
   *
   */
    angular
      .module('app.admin.states')
      .controller('RecruitmentCtrl', RecruitmentCtrl);
                                    /* @ngInject */
    function RecruitmentCtrl ($scope, $http, $state, toastr) {

        $scope.formData = {};

        $scope.submit = function(data) {
            toastr.success('The changes to admin-recruitment have been made', 'Status Updated');
            $http.post('/api/recruitment', $scope.formData);
            console.log('admin-recruitment status submitted:', $scope.formData);
            $state.reload();
        };
    }

})();
