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
      .module('topshelf.admin.states')
      .controller('RecruitmentCtrl', RecruitmentCtrl);
                                    /* @ngInject */
    function RecruitmentCtrl ($scope, $http, $state, toastr) {

        $scope.formData = {};

        $scope.submit = function(data) {
            toastr.success('The changes to recruitment have been made', 'Status Updated');
            $http.post('/api/recruitment', $scope.formData);
            console.log('recruitment status submitted:', $scope.formData);
            $state.reload();
        };
    }

})();
