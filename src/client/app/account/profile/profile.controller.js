(function() {
	angular
		.module('app.account')
		.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['Auth', 'accountSvc', 'ngToast', 'bnetSvc', '$timeout'];

	function ProfileCtrl(Auth, accountSvc, ngToast, bnetSvc, $timeout) {
		var vm = this;
		/**
		 * Reset profile save button to initial state
		 *
		 * @private
		 */
		function _btnSaveReset() {
			vm.btnSaved = false;
			vm.btnSaveText = 'Save';
		}

		_btnSaveReset();
		/**
		 * Get user's profile information
		 */
		vm.getProfile = function() {
			/**
			 * Function for successful API call getting user's profile data
			 * Show Account UI
			 *
			 * @param data {object} promise provided by $http success
			 * @private
			 */
			function _getUserSuccess(data) {
				vm.user = data;
				vm.administrator = Auth.isAdmin;
				vm.showAccount = true;
			}

      function _getCharactersSuccess(data) {
				vm.characters = data.data;
			}
			/**
			 * Function for error API call getting user's profile data
			 * Show an error alert in the UI
			 *
			 * @param error
			 * @private
			 */
			function _getUserError(error) {
				vm.errorGettingUser = true;
			}

			accountSvc.getAccount().then(_getUserSuccess, _getUserError);
      bnetSvc.getMyCharacters().then(_getCharactersSuccess, _getUserError);
		};
		/**
		 * Update user's profile information
		 * Called on submission of update form
		 */
		vm.updateProfile = function() {
			var profileData = {
				username: vm.user.username
			};

			/**
			 * Success callback when profile has been updated
			 *
			 * @private
			 */
			function _updateSuccess() {
				vm.btnSaved = true;
				vm.btnSaveText = 'Saved!';

				$timeout(_btnSaveReset, 2500);
			}

			/**
			 * Error callback when profile update has failed
			 *
			 * @private
			 */
			function _updateError() {
				vm.btnSaved = 'error';
				vm.btnSaveText = 'Error saving!';
			}

			if (!vm.user.username) {
				// Set status to Saving... and update upon success or error in callbacks
				vm.btnSaveText = 'Saving...';

				// Update the user, passing profile data and assigning success and error callbacks
				accountSvc.updateAccount(profileData).then(_updateSuccess, _updateError);
			}
		};
    vm.importCharacter = function() {
      var characterData = {
        characterName: vm.characterName
      };
      /**
       * Success callback when profile has been updated
       *
       * @private
       */
      function _updateSuccess() {
        vm.btnSaved = true;
        vm.btnSaveText = 'Saved!';

        $timeout(_btnSaveReset, 2500);
      }

      /**
       * Error callback when profile update has failed
       *
       * @private
       */
      function _updateError() {
        vm.btnSaved = 'error';
        vm.btnSaveText = 'Error saving!';
      }
      bnetSvc.addCharacter(characterData).then(_updateSuccess, _updateError);
    };
    vm.getProfile();
	}
})();
