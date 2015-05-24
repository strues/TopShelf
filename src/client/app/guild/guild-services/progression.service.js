(function () {
  'use strict';
  /**
     * @ngdoc Service
     * @name app.guild.services.service:Progression
     * @desc Communicates with backend delivering
     * information about progression
     */
  angular
    .module('app.guild')
    .factory('Progression', Progression);

  Progression.$inject = ['$http'];
  /* @ngInject */
  function Progression($http) {
    var urlBase = 'https://us.api.battle.net/wow/character/';
    var jspcb = 'jsonp=JSON_CALLBACK';
    var apiKey = 'apikey=urtsw3rtx2p5x4hy48efamnw39x8s7qw';
    var loc = 'locale=en_US';
    var realm = 'Sargeras';
    var toon = 'Teodin';
    var service = {
      all: all
    };
    return service;
    function all() {
      return $http.jsonp(urlBase + realm + '/' + toon + '?fields=progression' +
          '&' + loc + '&' + jspcb + '&' + apiKey, {
            headers: {'Accept-Encoding': 'gzip'}});
    }
  }
}());
