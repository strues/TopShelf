(function () {
  'use strict';
  /**
       * @ngdoc service
       * @name app.core.service:Article
       * @desc Communicates with backend returning posts
       * @memberOf app.core
       */
  angular
    .module('app.core')
    .factory('Article', Article);
  /* @ngInject */
  function Article($http) {
    var urlBase = 'api/v1/articles';
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
    function get(id) {
      return $http.get(urlBase + '/' + id);
    }
    function create(articleData) {
      return $http.post(urlBase, articleData);
    }
    function update(id, articleData) {
      return $http.put(urlBase + '/' + id, articleData);
    }
    function destroy(id) {
      return $http.delete(urlBase + '/' + id);
    }
  }
}());
