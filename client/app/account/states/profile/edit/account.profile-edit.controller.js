(function() {
    'use strict';

    angular
        .module('topshelf.account.states')
        .controller('ProfileEditCtrl', ProfileEditCtrl);

    /* @ngInject */
    function ProfileEditCtrl(Auth, User, toastr) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileEditCtrl';
        vm.Auth = Auth;
        vm.errors = {};

        vm.changePassword = function() {
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
            .then(function() {
                toastr.success('Your password has been changed.', 'All Set!')
            })
            .catch(function() {
                vm.message = '';
            });
            }
        };

})();
