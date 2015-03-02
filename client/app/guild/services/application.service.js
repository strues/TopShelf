(function() {
    'use strict';
    /**
     * @ngdoc Service
     * @name Application
     * @desc Handles requests for guild applications to the server
     * @memberOf app.guild.services
     */

    angular
        .module('app.guild.services')
        .factory('Application', Application);
                  /* @ngInject */
    function Application($http) {

        console.log('application.service.js');

        var urlBase = 'api/applications';
        var appFactory = {};

        appFactory.getAllApplications = function() {
            return $http.get(urlBase);
        };

        appFactory.getApplicationById = function(applicationId) {
            return $http.get(urlBase + '/' + applicationId);
        };

        appFactory.createApplication = function(formData) {
            return $http.post(urlBase, formData);
        };

        appFactory.updateApplication = function(updatedApplication) {
            return $http.put(urlBase + '/' + updatedApplication._id, updatedApplication);
        };

        appFactory.removeApplication = function(applicationId) {
            return $http.delete(urlBase + '/' + applicationId);
        };

        appFactory.getRealms = function() {
            $http.jsonp('http://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK')
                .success(function(data, status, headers, config) {
                    data.realms.map(function(item) {
                        $scope.realms.push(item.name);
                    });
                }).error(function(data, status, headers, config) {

                });
        };

        return appFactory;
    }

})();
