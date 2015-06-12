(function () {
  'use strict';
  /**
       * @ngdoc service
       * @name app.core.service:articleSvc
       * @desc Communicates with backend returning posts
       * @memberOf app.core
       */
  angular
    .module('app.core')
    .factory('articleSvc', articleSvc);
  /* @ngInject */
  articleSvc.$inject = ['$http'];

  function articleSvc($http) {
    var apiBase = 'api/articles';
    var service = {
      all: all,
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };
    return service;

    function all() {
      return $http.get(apiBase);
    }
    function get(id) {
      return $http.get(apiBase + '/' + id);
    }
    function create(articleData) {
      return $http.post(apiBase, articleData);
    }
    function update(id, articleData) {
      return $http.put(apiBase + '/' + id, articleData);
    }
    function destroy(id) {
      return $http.delete(apiBase + '/' + id);
    }
  }
}());
