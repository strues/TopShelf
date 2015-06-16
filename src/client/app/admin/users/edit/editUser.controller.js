(function() {

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.admin.AdminDashboardCtrl
   * @description
   * Controller
   */
  angular
      .module('app.admin')
      .controller('EditUserCtrl', EditUserCtrl);

  EditUserCtrl.$inject = ['User', '$scope', '$timeout', 'ngToast', '$http', '$stateParams'];
  /* @ngInject */
  function EditUserCtrl(User, $scope, ngToast, $timeout, $http, $stateParams) {
    var vm = this;
    var username = $stateParams.id;
    // @TODO: Put to a service
    if (username && username.length > 0) {
      User.get({username}, function(user) {
        vm.user = user;
      });
    };
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
     * Watch display name changes to check for empty or null string
     * Set button text accordingly
     *
     * @param newVal {string} updated displayName value from input field
     * @param oldVal {*} previous displayName value
     * @private
     */
    function _watchDisplayName(newVal, oldVal) {
      if (newVal === '' || newVal === null) {
        vm.btnSaveText = 'Enter Username';
      } else {
        vm.btnSaveText = 'Save';
      }
    }

    $scope.$watch('vm.user.username', _watchDisplayName);

    vm.updateUser = function() {
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
        ngToast('Saved user info');
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

      if (!!vm.user.username) {
        // Set status to Saving... and update upon success or error in callbacks
        vm.btnSaveText = 'Saving...';
        // @TODO: Put to a service
        return $http.put('/api/users/' + $stateParams.id, profileData);
    }

    vm.removeUser = function(user, ev) {
      User.remove({
        id: user._id
      }, function() {
        vm.users.splice(this.$index, 1);
      }.bind(this), function() {
        ngToast.create('User deleted');
      });
    };
  }
}
})();
