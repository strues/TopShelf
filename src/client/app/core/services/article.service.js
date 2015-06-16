(function () {

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
  articleSvc.$inject = ['$http', 'Auth'];

  function articleSvc($http, Auth) {
    var apiBase = 'api/articles';
    var service = {
      all: all,
      get: get,
      create: create,
      update: update,
      destroy: destroy,
      addComment: addComment
    };
    return service;

    function all() {
      return $http.get(apiBase + '?limit=10&skip=0');
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
    function addComment(id, commentData) {
      return $http.post(apiBase + '/' + id + '/comment', commentData);
    }
    function removeComment(commentId) {
      return $http.delete(apiBase + '/' + id + '/comment/' + commentId);
    }
  }
}());
