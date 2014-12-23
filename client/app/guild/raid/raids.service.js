(function () {
  'use strict';

  function RaidFactory ($http) {
     console.log('raid.service.js');

    var urlBase = 'api/raids';
        var exports = {};

    exports.getAllRaids = function(){
      return $http.get('/api/raids');
    };

    exports.getRaidById = function(raidId){
      return $http.get(urlBase + raidId);
    };

    exports.createRaid = function(newRaid){
      return $http.post(urlBase, newRaid);
    };

    exports.updateRaid = function(updatedRaid){
      return $http.put('/api/raids/' + updatedRaid._id, updatedRaid);
    };

    exports.removeRaid = function(raidId){
      return $http.delete(urlBase + raidId);
    };
    return exports;

  }

  angular
  .module('topshelf.core')
  .factory('RaidFactory', RaidFactory);
})();
