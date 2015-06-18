(function() {

  /**
   * @ngdoc service
   * @name app.core.armorySvc
   * @description < description placeholder >
   */

  angular
    .module('app.core')
    .factory('armorySvc', armorySvc);

  armorySvc.$inject = ['$http'];
  /* @ngInject */
  function armorySvc($http) {
    var urlBase = 'https://us.api.battle.net/wow/';
    var realm = 'Sargeras';
    var cb = 'jsonp=JSON_CALLBACK';
    var api = '5m653qcbnr4h6rue7e4e4k7ryvcnpa9p';
    var locale = 'locale=en_US';
    var guild = 'Top%20Shelf';

    var exports = {};

    /*
     * @TODO: Setup $cacheFactory and eventually save data to Mongo
     */

    exports.getMembers = function () {
      return $http.jsonp(urlBase + 'guild/' + realm + '/' + guild + '?fields=' +
      'members' + '&' + locale + '&' + cb + '&apikey=' + api, {cache:true});
    };

    return exports;

  }

})();
