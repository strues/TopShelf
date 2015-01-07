(function() {
    'use strict';

    /* @ngInject */
    function ArmoryService ($http, $localStorage) {
        var armoryData = {
            getRealms: getRealms,
            getRegion: getRegion,
            setRegion: setRegion,
            getRealm: getRealm,
            setRealm: setRealm,
            getGuildName: getGuildName,
            setGuildName: setGuildName,
            getCharacters: getCharacters,
            getTopShelf: getTopShelf,
            asError: asError,
            saveInStorage: saveInStorage
        };
        var vm = this;
        var data = {
            region: '',
            realm: '',
            guildName: ''
        };

        return armoryData;

        ////////////////
        function getRealms () {
            return $http.jsonp('https://' + getRegion().toLowerCase() +
                    '.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK');
        }
        function getRegion() {
            return data.region;
        }
        function setRegion(region) {
            data.region = region;
        }
        function getRealm() {
            return data.realm;
        }
        function setRealm(realm) {
            data.realm = realm;
        }
        function getGuildName() {
            return data.guildName;
        }
        function setGuildName(guildName) {
            data.guildName = guildName;
        }
        function getCharacters () {
            return $http.jsonp('https://' + getRegion().toLowerCase() +
                '.battle.net/api/wow/guild/' + getRealm() + '/' +
                getGuildName() + '?fields=members&jsonp=JSON_CALLBACK&callback=JSON_CALLBACK');
        }
        function getTopShelf () {
            return $http.jsonp('https://us.battle.net/api/wow/guild/sargeras' +
                '/top%20shelf' + '?fields=members&jsonp=JSON_CALLBACK&callback=JSON_CALLBACK');
        }
        function asError (status, statusText) {
            return 'Unable to fetch data from armory (Code ' + status + ') : ' + '\n' + statusText;
        }
        function saveInStorage () {
            if (typeof (Storage) !== 'undefined') {
                localStorage.setItem('wow-roster-region', data.region);
                localStorage.setItem('wow-roster-realm', data.realm);
                localStorage.setItem('wow-roster-guild-name', data.guildName);
            }
        }
    }
    angular
        .module('topshelf.core')
        .factory('ArmoryService', ArmoryService);
})();
