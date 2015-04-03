(function () {
    'use strict';
    function AdminDashboardCtrl(Auth, $http, User) {
        var dash = this;
        dash.users = {};
        var warcraftlogs = 'https://www.warcraftlogs.com:443/v1/reports/guild/top%20shelf/sargeras/us?api_key=';
        var jspcb = 'jsonp=JSON_CALLBACK';
        var wclAPI = '24ec6a17396bb5adbd6ac36d5ce43e71';
    }
    angular.module('app.admin').controller('AdminDashboardCtrl', AdminDashboardCtrl);
}());
