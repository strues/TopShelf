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

        /**
         * Function for successful API call getting user list
         * Show Admin UI
         * Display list of users
         *
         * @param data {Array} promise provided by $http success
         * @private
         */
        function _getAllUsersSuccess(data) {
            vm.users = data;
        }

        /**
         * Function for unsuccessful API call getting user list
         * Show Unauthorized error
         *
         * @param error {error} response
         * @private
         */
        function _getAllUsersError(error) {
            vm.showAdmin = false;
        }

        User.getAllUsers().then(_getAllUsersSuccess, _getAllUsersError);

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
