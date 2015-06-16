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
    function UserCtrl(User, ngToast) {
        var vm = this;

      User.query(function(data) {
        vm.users = data;
      });

    }
})();
