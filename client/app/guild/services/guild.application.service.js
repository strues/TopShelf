/**
 * application.service.js in web
 */
(function() {
    'use strict';

    angular
        .module('app.guild.services')
        .factory('Application', Application);
/* @ngInject */
    function Application($http) {
        console.log('application.service.js');

        var urlBase = 'api/applications';
        var exports = {};

        exports.getAllApplications = function() {
            return $http.get(urlBase);
        };

        exports.getApplicationById = function(applicationId) {
            return $http.get(urlBase + '/' + applicationId);
        };

        exports.createApplication = function(formData) {
            return $http.post(urlBase, formData);
        };

        exports.updateApplication = function(updatedApplication) {
            return $http.put(urlBase + '/' + updatedApplication._id, updatedApplication);
        };

        exports.removeApplication = function(applicationId) {
            return $http.delete(urlBase + '/' + applicationId);
        };

        exports.getRealms = function() {
            $http.jsonp('http://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK')
                .success(function(data, status, headers, config) {
                    data.realms.map(function(item) {
                        $scope.realms.push(item.name);
                    });
                }).error(function(data, status, headers, config) {

                });
        };
        return exports;

    }

})();
