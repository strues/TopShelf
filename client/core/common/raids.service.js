(function () {
  'use strict';

angular
  .module('topshelf.core')
  .factory('raidsFactory', raidsFactory);

  function raidsFactory ($http) {
    // console.log('raidsFactory.service.js');

    var urlBase = 'api/raids';
    var raidsFactory = {};

    raidsFactory.getRaids = function () {
      // console.log('raidsFactory.service.js - getRaids');
      return $http.get(urlBase);
    };

    raidsFactory.createRaid = function (raid) {
      // console.log('raidsFactory.service.js - createRaids', raid);
      return $http.post(urlBase, raid)
    };

    raidsFactory.deleteRaid = function (raidID) {
      // console.log('raidsFactory.service.js - deleteRaid', raidID);
      return $http.delete(urlBase + '/' + raidID)
    };

    raidsFactory.showRaid = function (raidID) {
      // console.log('raidsFactory.service.js - showRaid', raidID);
      return $http.get(urlBase + '/' + raidID)
    };

    raidsFactory.updateRaid = function (raidID, raid) {
      // console.log('raidsFactory.service.js - updateRaid', raidID, raid);
      return $http.put(urlBase + '/' + raidID, raid)
    };

    return raidsFactory;

  };
})();
