(function() {
  'use strict';

  angular
    .module('app.common')
    .factory('recruitSvc', recruitSvc);

  recruitSvc.$inject = ['$http'];

  function recruitSvc($http) {
    var apiBase = '/api/recruiting';
    var service = {
      list: list,
      show: show,
      create: create,
      change: change,
      destroy: destroy
    };

    return service;

    ////////////////////////////

    function list() {
      return $http.get(apiBase);
    }

    function show(id) {
      return $http.get(apiBase + '/' + id);
    }
    function create(recruitData) {
      return $http.post(apiBase, recruitData);
    }
    function change(id, recruitData) {
      return $http.put(apiBase + '/' + id, recruitData);
    }
    function destroy(id) {
      return $http.delete(apiBase + '/' + id);
    }

  }

})();
