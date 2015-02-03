(function() {
    'use strict';

    angular
        .module('topshelf.account.states')
        .controller('ProfileEditCtrl', ProfileEditCtrl);

    /* @ngInject */
    function ProfileEditCtrl($http, $scope, Auth, Character, User, ngFabForm, toastr) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileEditCtrl';
        vm.Auth = Auth;
        vm.errors = {};
        $scope.formData = {};
        vm.changePassword = function() {
            Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
                .then(function() {
                    toastr.success('Your password has been changed.', 'All Set!');
                })
                .catch(function() {
                    vm.message = '';
                });
        };
        $scope.submit = function() {
            $scope.defaultFormOptions = ngFabForm.config;
            $scope.customFormOptions = angular.copy(ngFabForm.config);
            Character.create($scope.characterData)
                .success(function(data) {
                    $scope.characterData = {};
                    toastr.success('Character Added!')
                })
                .error(function(error) {
                    toastr.error('There was a problem with your character' + error.message,
                        'Something broke');
                });
        }

    }

})();
