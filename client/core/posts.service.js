(function () {
  'use strict';

angular
  .module('topshelf.core')
  .factory('postsFactory', postsFactory);

  function postsFactory ($http) {
    // console.log('postsFactory.service.js');

    var urlBase = 'api/posts';
    var postsFactory = {};

    postsFactory.getPosts = function () {
      // console.log('postsFactory.service.js - getPosts');
      return $http.get(urlBase);
    };

    postsFactory.createPost = function (post) {
      // console.log('postsFactory.service.js - createPosts', post);
      return $http.post(urlBase, post)
    };

    postsFactory.deletePost = function (postID) {
      // console.log('postsFactory.service.js - deletePosts', postID);
      return $http.delete(urlBase + '/' + postID)
    };

    postsFactory.showPost = function (postID) {
      // console.log('postsFactory.service.js - showPost', postID);
      return $http.get(urlBase + '/' + postID)
    };

    postsFactory.updatePost = function (postID, post) {
      // console.log('postsFactory.service.js - updatePost', postID, post);
      return $http.put(urlBase + '/' + postID, post)
    };

    return postsFactory;

  };
})();
