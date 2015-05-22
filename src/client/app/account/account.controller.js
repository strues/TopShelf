(function() {
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

  AccountCtrl.$inject = ['$scope', '$auth', 'User', 'userData', '$timeout',
    'OAUTH', '$location'];

  function AccountCtrl($scope, $auth, userData, $timeout,
    OAUTH, User, $location) {
    var account = this;

    /**
     * Is the user authenticated?
     *
     * @returns {boolean}
     */
    account.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    /**
     * Get user's profile information
     */
    account.getProfile = function() {
      /**
       * Function for successful API call getting user's profile data
       * Show Account UI
       * @private
       */
      function _getUserSuccess(data) {
        account.user = data;
        account.administrator = account.user.isAdmin;
        account.linkedAccounts =
          User.getLinkedAccounts(account.user, 'account');
        account.showAccount = true;
      }

      /**
       * Function for error API call getting user's profile data
       * Show an error alert in the UI
       * @private
       */
      function _getUserError(error) {
        account.errorGettingUser = true;
      }

      userData.getUser().then(_getUserSuccess, _getUserError);
    };

    /**
     * Reset profile save button to initial state
     *
     * @private
     */
    function _btnSaveReset() {
      account.btnSaved = false;
      account.btnSaveText = 'Save';
    }

    _btnSaveReset();

    /**
     * Watch display name changes to check for empty or null string
     * Set button text accordingly
     * @private
     */
    function _watchDisplayName(newVal, oldVal) {
      if (newVal === '' || newVal === null) {
        account.btnSaveText = 'Enter Name';
      } else {
        account.btnSaveText = 'Save';
      }
    }
    $scope.$watch('account.user.displayName', _watchDisplayName);

    /**
     * Update user's profile information
     * Called on submission of update form
     */
    account.updateProfile = function() {
      var profileData = {
        displayName: account.user.displayName
      };

      /**
       * Success callback when profile has been updated
       *
       * @private
       */
      function _updateSuccess() {
        account.btnSaved = true;
        account.btnSaveText = 'Saved!';

        $timeout(_btnSaveReset, 2500);
      }

      /**
       * Error callback when profile update has failed
       *
       * @private
       */
      function _updateError() {
        account.btnSaved = 'error';
        account.btnSaveText = 'Error saving!';
      }

      if (!!account.user.displayName) {
        // Set status to Saving... and update upon success or error in callbacks
        account.btnSaveText = 'Saving...';

        // Update the user, passing profile data and assigning success and error callbacks
        userData.updateUser(profileData).then(_updateSuccess, _updateError);
      }
    };

    /**
     * Link third-party provider
     *
     * @param {string} provider
     */
    account.link = function(provider) {
      $auth.link(provider)
                .then(function() {
                  account.getProfile();
                })
                .catch(function(response) {
                  Materialize.toast(response.data.message, 3000);
                });
    };

    /**
     * Unlink third-party provider
     *
     * @param {string} provider
     */
    account.unlink = function(provider) {
      $auth.unlink(provider)
                .then(function() {
                  account.getProfile();
                })
                .catch(function(response) {
                  Materialize.toast(response.data ? response.data.message : // jshint ignore:line
                    'Could not unlink ' + provider + ' account', 3000);
                });
    };

  }
})();
