(function() {
    'use strict';
    /**
     * @ngdoc Service
     * @name app.guild.services.service:Progression
     * @desc Communicates with backend delivering information about progression.
     */

    angular
        .module('app.guild.services')
        .service('Progression', Progression);

    Progression.$inject = ['$http'];
    /* @ngInject */
    function Progression($http) {
        var urlBase = '/api/progression';
        var service = {
            all: all,
            get: get,
            create: create,
            update: update,
            destroy: destroy
        };
        return service;

        function all() {
            console.log('Getting all progression kills');
            return $http.get(urlBase);
        }

        function get(progressionId) {
            console.log('Getting this ' + progressionId);
            return $http.get(urlBase + '/' + progressionId);
        }

        function create(progressionData) {
            console.log(progressionData);
            return $http.post(urlBase, progressionData);
        }

        function update(progressionId, progressionData) {
            return $http.put(urlBase + '/' + progressionId, progressionData);
        }

        function destroy(progressionId) {
            return $http.delete(urlBase + '/' + progressionId);
        }

    }

})();
