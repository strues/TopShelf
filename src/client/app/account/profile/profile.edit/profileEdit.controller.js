(function () {
    'use strict';
    angular.module('app.account')
      .controller('ProfileEditController', ProfileEditController);
    /* @ngInject */
    function ProfileEditController($http, $scope, Auth,
      Character, User, ngFabForm, toastr) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileEditController';
        vm.Auth = Auth;
        vm.errors = {};
        $scope.formData = {};
        vm.changePassword = function () {
            Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
            .then(function () {
                toastr.success('Your password has been changed.', 'All Set!');
            }).catch(function () {
                vm.message = '';
            });
        };
        $scope.submit = function () {
            $scope.defaultFormOptions = ngFabForm.config;
            $scope.customFormOptions = angular.copy(ngFabForm.config);
            Character.create($scope.characterData).success(function (data) {
                $scope.characterData = {};
                toastr.success('Character Added!');
            }).error(function (error) {
                toastr.error('There was a problem with your character' +
                  error.message, 'Something broke');
            });
        };
        $scope.changeBattletag = function (form) {
            //check for jpg/png/jpeg
            console.log('ok');
            console.log($scope.user);
            Auth.changeBattletag($scope.user.newBattletag);
            $scope.loadData();
        };
        $scope.changeAvatar = function (form) {
            //check for jpg/png/jpeg
            console.log('ok');
            console.log($scope.user);
            Auth.changeAvatar($scope.user.newAvatar);
            $scope.loadData();
        };
    }
}());
