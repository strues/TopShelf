(function() {
    'use strict';

    angular
        .module('topshelf.account.states')
        .controller('ProfileEditCtrl', ProfileEditCtrl);

    /* @ngInject */
    function ProfileEditCtrl(Auth, User) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileEditCtrl';
        vm.Auth = Auth;

        vm.errors = {};

        vm.changePassword = function(form) {
            vm.submitted = true;
            if (form.$valid) {
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
            .then(function() {
                vm.message = 'Password successfully changed.';
            })
            .catch(function() {
                form.password.$setValidity('mongoose', false);
                vm.errors.other = 'Incorrect password';
                vm.message = '';
            });
            }
    };

    }
})();
