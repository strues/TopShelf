(function() {
    'use strict';
    /**
     * @ngdoc Service
     * @name Recruitment
     * @desc Communicates with backend handling recruitment status api calls
     * @memberOf app.guild.services
     */

    angular
        .module('app.guild.services')
        .factory('Recruitment', Recruitment);
    /* @ngInject */
    function Recruitment($http) {
        var urlBase = 'api/recruitment';
        var recruitmentFactory = {};

        recruitmentFactory.all = function() {
            console.log('Getting all recruiting needs');
            return $http.get(urlBase);
        };

        recruitmentFactory.get = function(id) {
            console.log('Getting this ' + id);
            return $http.get(urlBase + '/' + id);
        };

        recruitmentFactory.create = function(recruitmentData) {
            console.log(recruitmentData);
            return $http.post(urlBase, recruitmentData);
        };

        recruitmentFactory.update = function(id, recruitmentData) {
            return $http.put(urlBase + '/' + id, recruitmentData);
        };

        recruitmentFactory.delete = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        return recruitmentFactory;

    }

})();
