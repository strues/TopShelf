(function() {
    'use strict';
    /**
     * @ngdoc Service
     * @name app.guild.services.service:Application
     * @description Handles requests for guild applications to the server
     */

    angular
        .module('app.guild.services')
        .service('Application', Application);

    Application.$inject = ['$http'];
    /* @ngInject */
    function Application($http) {
        var urlBase = 'api/applications';
        var service = {
            getAllApplications: getAllApplications,
            getApplicationById: getApplicationById,
            createApplication: createApplication,
            updateApplication: updateApplication,
            removeApplication: removeApplication,
            getRealms: getRealms
        };
        return service;

        function getAllApplications() {
            console.log('Retrieving all applications');
            return $http.get(urlBase);
        }

        function getApplicationById(applicationId) {
            console.log('Getting this ' + applicationId);
            return $http.get(urlBase + '/' + applicationId);
        }

        function createApplication(formData) {
            console.log(formData);
            return $http.post(urlBase, formData);
        }

        function updateApplication(applicationId, updatedApplication) {
            return $http.put(urlBase + '/' + applicationId, updatedApplication);
        }

        function removeApplication(applicationId) {
            return $http.delete(urlBase + '/' + applicationId);
        }

        function getRealms() {
            return $http.jsonp('http://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK')
                .success(function(data, status, headers, config) {
                    data.realms.map(function(item) {
                        $scope.realms.push(item.name);
                    });
                }).error(function(data, status, headers, config) {

                });
        }

    }

})();
