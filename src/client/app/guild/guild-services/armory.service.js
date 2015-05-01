/**
 * armory.service.js
 */
(function () {
  'use strict';
  angular
    .module('app.guild')
    .factory('Armory', Armory);
  /* @ngInject */
  function Armory($http) {
    var data = {
      region: 'us',
      realm: '',
      guildName: ''
    };
    var urlBase = 'https://us.api.battle.net/wow/';
    var jspcb = 'jsonp=JSON_CALLBACK';
    var apiKey = 'apikey=urtsw3rtx2p5x4hy48efamnw39x8s7qw';
    var loc = 'locale=en_US';
    var guildName = 'Top Shelf';
    var exports = {};
    exports.getRealms = function () {
      return $http.jsonp(urlBase + '/realm/status?' +
        loc + '&' + jspcb + '&' + apiKey);
    };
    exports.asError = function (status, statusText) {
      return 'Unable to fetch data from armory (Code ' +
        status + ') : ' + '\n' + statusText;
    };
    exports.getTopShelfMembers = function () {
      return $http.jsonp(urlBase +
        'guild/sargeras/Top%20Shelf?fields=members' + '&' +
        loc + '&' + jspcb + '&' + apiKey);
    };
    exports.setRealm = function (realm) {
      data.realm = realm;
    };
    exports.setRegion = function (region) {
      data.region = region;
    };
    exports.getTopShelfMembers = function (roster) {
      data.roster = roster;
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
