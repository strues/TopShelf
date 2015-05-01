(function () {
    'use strict';
    /**
       * @ngdoc Service
       * @name app.guild.services.service:Recruitment
       * @desc Communicates with backend handling recruitment status api calls
       */
    angular
      .module('app.guild')
      .factory('Recruitment', Recruitment);

    /* @ngInject */
    function Recruitment($http) {
        var urlBase = '/api/recruitment';
        var service = {
            all: all,
            get: get,
            create: create,
            update: update,
            destroy: destroy
        };
        return service;
        function all() {
            console.log('Getting all recruiting needs');
            return $http.get(urlBase);
        }
        function get(recruitmentId) {
            console.log('Getting this ' + recruitmentId);
            return $http.get(urlBase + '/' + recruitmentId);
        }
        function create(recruitmentData) {
            console.log(recruitmentData);
            return $http.post(urlBase, recruitmentData);
        }
        function update(recruitmentId, recruitmentData) {
            return $http.put(urlBase + '/' + recruitmentId, recruitmentData);
        }
        function destroy(recruitmentId) {
            return $http.delete(urlBase + '/' + recruitmentId);
        }
    }
}());
