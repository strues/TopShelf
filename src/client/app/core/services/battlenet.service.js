(function() {
/**
 * @ngdoc service
 * @name app.core.bnetSvc
 * @description < description placeholder >
 */

  angular
    .module('app.core')
    .factory('bnetSvc', bnetSvc);

  bnetSvc.$inject = ['$http'];
  /* @ngInject */
  function bnetSvc($http) {

    var service = {
      addCharacter: addCharacter,
      getMyCharacters: getMyCharacters
    };

    return service;

    ////////////////////////////

    function addCharacter(characterData) {
      return $http.post('/api/battlenet/characters', characterData);
    }
    function getMyCharacters() {
      return $http.get('/api/battlenet/characters/me');
    }
  }

})();
