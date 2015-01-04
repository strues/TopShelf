(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name topshelf.user.controller:SettingsCtrl
   *
   * @description
   *
   */
    angular
        .module('topshelf.account.states')
        .controller('SettingsCtrl', SettingsCtrl);

    function SettingsCtrl($scope, Auth) {

   // var vm = this;
        $scope.errors = {};

        $scope.changePassword = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
        .then(function() {
            $scope.message = 'Password successfully changed.';
        })
        .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
        });
        }
    };
    }

})();
