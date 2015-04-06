/**
 * armory.service.js
 */
(function () {
    'use strict';

    angular
        .module('app.guild')
        .factory('Armory', Armory);

    function Armory($http) {
        var data = {
            region: 'us',
            realm: '',
            guildName: ''
        };

        var urlBase = 'https://us.api.battle.net/wow/';
        var jspcb = 'jsonp=JSON_CALLBACK';
        var apiKey = 'apikey=jbdqc3ufm6hfzpymxc3ej52988vvh59b';
        var loc = 'locale=en_US';
        var guildName = 'Top Shelf';
        var exports = {};

        exports.getRealms = function () {
            return $http.jsonp(urlBase + '/realm/status?' + loc + '&' + jspcb + '&' + apiKey);
        };
        exports.asError = function (status, statusText) {
            return 'Unable to fetch data from armory (Code ' + status + ') : ' + '\n' + statusText;
        };
        exports.getTopShelfMembers = function () {
            return $http.jsonp(urlBase + 'guild/sargeras/Top%20Shelf?fields=members' +
            '&' + loc + '&' + jspcb + '&' + apiKey);
        };
        exports.setRealm = function (realm) {
            data.realm = realm;
        };
        exports.setRegion = function (region) {
            data.region = region;
        };
        exports.getRoster = function () {
            return $http.get('/api/roster');
        };
        exports.saveInStorage = function () {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem('topshelf-region', data.region);
                localStorage.setItem('topshelf-realm', data.realm);
                localStorage.setItem('topshelf-guild-name', data.guildName);
            }
        };
        return exports;
    }

}());
