(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.admin.AdminDashboardCtrl
   * @description
   * Controller
   */
  angular
    .module('app.admin')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['User', 'ngToast'];
  /* @ngInject */
  function UserCtrl(User, toastr) {
    var vm = this;
    vm.users = User.query();

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
})();
