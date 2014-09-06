(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name account.controller:SettingsCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function SettingsCtrl(Auth, User) {
    var vm = this;
    vm.ctrlName = 'SettingsCtrl';

     vm.errors = {};

    vm.changePassword = function(form) {
      vm.submitted = true;
      if(form.$valid) {
        Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
        .then( function() {
          vm.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
      }
    };
  }

  angular
    .module('account')
    .controller('SettingsCtrl', SettingsCtrl);

})();
