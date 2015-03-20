(function () {
    'use strict';
    /**
     * @ngdoc Service
     * @name app.core.services.service:Slide
     * @desc Communicates with backend handling recruitment status api calls
     */
    angular.module('app.core.services').service('Slide', Slide);
    Slide.$inject = ['$http'];
    /* @ngInject */
    function Slide($http) {
        var urlBase = '/api/slides';
        var service = {
            all: all,
            get: get,
            create: create,
            update: update,
            destroy: destroy
        };
        return service;
        function all() {
            console.log('Getting all slides');
            return $http.get(urlBase);
        }
        function get(slideId) {
            console.log('Getting this ' + slideId);
            return $http.get(urlBase + '/' + slideId);
        }
        function create(slideData) {
            console.log(slideData);
            return $http.post(urlBase, slideData);
        }
        function update(slideId, slideData) {
            return $http.put(urlBase + '/' + slideId, slideData);
        }
        function destroy(slideId) {
            return $http.delete(urlBase + '/' + slideId);
        }
    }
}());