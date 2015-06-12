(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('RecruitmentCtrl', RecruitmentCtrl);

  RecruitmentCtrl.$inject = ['recruitSvc', '$state', 'classSpec',
    'classDef', 'toastr'
  ];

  function RecruitmentCtrl(recruitSvc, $state, classSpec, classDef, toastr) {

    /*jshint validthis: true */
    var vm = this;

    // funcation assignment
    vm.formData = {};
    vm.submit = function () {
      recruitSvc.create(vm.formData).success(function() {

        toastr.success('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error) {
        toastr.error('There was a problem with the server' +
          error.message, 'Something broke');
      });
    };

    vm.recruitTD = {}
    vm.save = function () {
      recruitSvc.createThread(vm.recruitTD).success(function() {

        toastr.success('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error) {
        toastr.error('There was a problem with the server' +
          error.message, 'Something broke');
      });
    };
  }
})();
