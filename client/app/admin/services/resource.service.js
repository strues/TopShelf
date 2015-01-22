(function () {
    'use strict';

    function ResourceFactory ($http) {
        console.log('resource.service.js');

        var urlBase = 'api/resources';
        var exports = {};

        exports.getAllResources = function () {
            return $http.get(urlBase);
        };

        exports.getResourceById = function(resourceId) {
            return $http.get(urlBase + '/' + resourceId);
        };

        exports.createResource = function(newResource) {
            return $http.post(urlBase, newResource);
        };

        exports.updateResource = function(updatedResource) {
            return $http.put(urlBase + '/' + updatedResource._id, updatedResource);
        };

        exports.removeResource = function(resourceId) {
            return $http.delete(urlBase + '/' + resourceId);
        };

        return exports;

    }

    angular
        .module('topshelf.admin.services')
        .factory('ResourceFactory', ResourceFactory);
})();
