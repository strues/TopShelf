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
    isAlreadyLiked: function(applicationId) {
        if (applicationId !== null) {
            for (var i in applicationLiked) {
                if (applicationLiked[i] === applicationId) {
                    return true;
                }
            }

            return false;
        }

        return false;
    },

    like: function(applicationId) {
        if (!this.isAlreadyLiked(applicationId)) {
            applicationLiked.push(applicationId);
            $window.sessionStorage.applicationLiked = applicationLiked;
        }
    },

    unlike: function(applicationId) {
        if (this.isAlreadyLiked(applicationId)) {
            for (var i in applicationLiked) {
                if (applicationLiked[i] !== applicationId) {

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
