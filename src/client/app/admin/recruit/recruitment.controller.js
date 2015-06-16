(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('RecruitmentCtrl', RecruitmentCtrl);

  RecruitmentCtrl.$inject = ['recruitSvc', '$state', 'classSpec',
    'classDef', 'ngToast'
  ];

  function RecruitmentCtrl(recruitSvc, $state, classSpec, classDef, ngToast) {

    /*jshint validthis: true */
    var vm = this;

    // funcation assignment
    vm.formData = {};
    vm.submit = function () {
      recruitSvc.create(vm.formData).success(function() {

        ngToast.create('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error) {
        ngToast.create('There was a problem with the server' +
          error.message, 'Something broke');
      });
    };

    vm.recruitTD = {}
    vm.save = function () {
      recruitSvc.createThread(vm.recruitTD).success(function() {

        ngToast.create('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error) {
        ngToast.create('There was a problem with the server' +
          error.message, 'Something broke');
      });
    };
  }
})();
