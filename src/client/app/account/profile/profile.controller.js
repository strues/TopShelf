(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$auth', 'userSrv', 'toastr'];

  function ProfileCtrl($auth, userSrv, toastr) {
    var vm = this;

    //var userRole = Authorization.checkAccess();
    //console.log(userRole);


    /**
     * Get user's profile information.
     */
    vm.getProfile = function() {
      userSrv.getProfile()
        .success(function(data) {
          vm.user = data;
        })
        .error(function(error) {
          toastr.error(error + 'something is broken', 'fuck');
        });
    };
    vm.showCharacters = function() {
      userSrv.getCharacters()
        .success(function(data) {
          vm.characters = data;
        })
        .error(function(error) {
          toastr.error(error + 'something is broken', 'fuck');
        });
    };
    /**
     * Update user's profile information.
     */
    vm.updateProfile = function() {
      userSrv.updateProfile({
        displayName: vm.user.displayName,
        email: vm.user.email
      }).then(function() {
        toastr.success('Updated your profile', 'Success');
      });
    };

    /**
     * Link third-party provider.
     */
    vm.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          toastr.success('You have successfully linked ' + provider +
            ' account', 'Awesome');
        })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          toastr.info(response, 'shit');
        });
    };

    /**
     * Unlink third-party provider.
     */
    vm.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          toastr.info('You have successfully unlinked ' +
            provider + ' account', 'It worked');
        })
        .then(function() {
          vm.getProfile();
        })
        .catch(function(response) {
          toastr.error(response.data ? response.data.message :
          'Could not unlink ' + provider + ' account', 'Sorry');
        });
    };

    vm.getProfile();
  }
})();
