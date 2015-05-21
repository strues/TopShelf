(function () {
  'use strict';
  angular.module('app.account')
    .controller('ProfileEditController', ProfileEditController);
  /* @ngInject */
  ProfileEditController.$inject = ['Auth'];
  function ProfileEditController(Auth) {
    /*jshint validthis: true */
    var vm = this;
    vm.currentUser = Auth.getCurrentUser();
    vm.errors = {};
    vm.formData = {};
    vm.changePassword = function () {
      Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
            .then(function () {
              Materialize.toast('Your password has been changed', 3000);
            }).catch(function () {
              vm.message = '';
            });
    };

  }
}());
