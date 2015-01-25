(function () {
    'use strict';

    function AdminDashboardCtrl(Auth, $http, User) {
        var dash = this;
        dash.users = {};
        $http.get('/api/users').success(function(users) {
            dash.users = users;

        });
    }

    angular
        .module('topshelf.admin')
        .controller('AdminDashboardCtrl', AdminDashboardCtrl);
})();
