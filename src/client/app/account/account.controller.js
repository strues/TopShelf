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
          console.log(error);
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
        console.log('updated');
      });
    };

    /**
     * Link third-party provider.
     */
    vm.link = function(provider) {
      $auth.link(provider).then(function() {
        console.log('success');
      })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    /**
     * Unlink third-party provider.
     */
    vm.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          console.log('success');
        })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          console.log(response);
        });
    };
    vm.getProfile();
  }
})();
