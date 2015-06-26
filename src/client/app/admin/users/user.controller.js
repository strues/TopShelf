(function() {

    /* jshint latedef: nofunc */
    /** @ngdoc controller
     * @name app.admin.AdminDashboardCtrl
     * @description
     * Controller
     */
    angular
        .module('app.admin')
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['User', 'toastr'];
    /* @ngInject */
    function UserCtrl(User, toastr) {
        var vm = this;

      User.query(function(data) {
        vm.users = data;
      });

    }
})();
