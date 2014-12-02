/**
 * like.service.js in web
 */

(function () {
  'use strict';

  function LikeService ($window) {
    console.log('like.service.js');

  //Contains application ids already liked by the user
  var applicationLiked = [];

  if ($window.sessionStorage && $window.sessionStorage.applicationLiked) {
    applicationLiked.push($window.sessionStorage.applicationLiked);
  }


  return {
    isAlreadyLiked: function(id) {
      if (id != null) {
        for (var i in applicationLiked) {
          if (applicationLiked[i] == id) {
            return true;
          }
        }

        return false;
      }

      return false;
    },

    like: function(id) {
      if (!this.isAlreadyLiked(id)) {
        applicationLiked.push(id);
        $window.sessionStorage.applicationLiked = applicationLiked;
      }
    },

    unlike: function(id) {
      if (this.isAlreadyLiked(id)) {
        for (var i in applicationLiked) {
          if (applicationLiked[i] == id) {
            applicationLiked.splice(i, 1);
            $window.sessionStorage.applicationLiked = applicationLiked;

            break;
          }
        }
      }
    }
  };

}

    angular
      .module('topshelf.core')
      .factory('LikeService', LikeService);
  })();
