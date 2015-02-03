(function () {
    'use strict';
  /**
   * @ngdoc Service
   * @name Character
   * @desc Communicates with backend returning posts
   * @memberOf topshelf.core.services
   */

    angular
        .module('topshelf.core.services')
        .factory('Character', Character);

    /* @ngInject */
    function Character ($http) {
        console.log('Character Factory: topshelf.core.services');

        var urlBase = 'api/characters';
        var characterFactory = {};

        characterFactory.all = function () {
            console.log('Getting all characters');
            return $http.get(urlBase);
        };

        characterFactory.get = function(id) {
            console.log('Getting this ' + id);
            return $http.get(urlBase + '/' + id);
        };

        characterFactory.create = function(characterData) {
            console.log(characterData);
            return $http.post(urlBase, characterData);
        };

        characterFactory.update = function(id, characterData) {
            return $http.put(urlBase + '/' + id, characterData);
        };

        characterFactory.delete = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        return characterFactory;

    }

})();
