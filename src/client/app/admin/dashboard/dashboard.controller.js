(function () {
    'use strict';
    angular
    .module('app.admin')
    .controller('DashboardController', DashboardController);
    /* @ngInject */
    function DashboardController(Auth, $http, User) {
        var vm = this;
        vm.users = {};

    }

}());
