(function () {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.account.controller:AccountCtrl
   *
   * @description
   * Allows for the linking and unlinking of third party accounts and
   * provides the ability to update profile information.
   */
  angular
    .module('app.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$auth', 'userData'];

  function AccountCtrl($auth, userData) {
    var vm = this;
    /**
     * Get user's profile information.
     */
    vm.getProfile = function() {
      userData.getProfile().success(function(data) {
        vm.user = data;
      })
        .error(function(error) {
          Materialize.toast(error, 3000);
        });
    };

    /**
     * Update user's profile information.
     */
    vm.updateProfile = function() {
      userData.updateProfile({
        displayName: vm.user.displayName,
        email: vm.user.email
      }).then(function() {
        Materialize.toast('Successfully updated your account info', 3000);
      });
    };

    /**
     * Link third-party provider.
     */
    vm.link = function(provider) {
      $auth.link(provider).then(function() {
        Materialize.toast('Successfully linked with your account', 3000);
      })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          Materialize.toast(response, 3000);
        });
    };

    /**
     * Unlink third-party provider.
     */
    vm.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          Materialize.toast('Successfully unlinked from your account', 3000);
        })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          Materialize.toast(response, 3000);
        });
    };
    vm.getProfile();
  }
})();
