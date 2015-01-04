(function () {
    'use strict';

    function GuildFactory ($http) {
        console.log('guild.service.js');

        var urlBase = 'api/guild';
        var exports = {};

        exports.getGuildProfile = function () {
            return $http.get(urlBase);
        };

        return exports;

    }

    angular
        .module('topshelf.core')
        .factory('GuildFactory', GuildFactory);
})();
