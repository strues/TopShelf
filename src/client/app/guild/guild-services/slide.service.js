(function () {
  'use strict';
  /**
       * @ngdoc Service
       * @name app.guild.service:Slide
       * @desc
       * Grabs the images from the api to display
       * in the carousel
       */
  angular
    .module('app.guild')
    .factory('Slide', Slide);

  Slide.$inject = ['$http'];
  /* @ngInject */
  function Slide($http) {
    var urlBase = '/api/v1/slides';
    var service = {
      all: all,
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };
    return service;

    function all() {
      return $http.get(urlBase);
    }
    function get(slideId) {
      return $http.get(urlBase + '/' + slideId);
    }
    function create(slideData) {
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
