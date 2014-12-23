(function () {
  'use strict';



 function recruitmentFactory ($http) {
    console.log('recruitmentFactory.service.js');

    var urlBase = 'api/recruitment';
    var exports = {};

    exports.getRecruitment = function () {
      // console.log('recruitmentFactory.service.js - getPosts');
      return $http.get(urlBase);
    };

    exports.createRecruitment = function (recruitment) {
      // console.log('recruitmentFactory.service.js - createPosts', post);
      return $http.post(urlBase, recruitment);
    };

    exports.deleteRecruitment = function (recruitmentID) {
      // console.log('recruitmentFactory.service.js - deletePosts', postID);
      return $http.delete(urlBase + '/' + recruitmentID);
    };

    exports.showRecruitment = function (recruitmentID) {
      // console.log('recruitmentFactory.service.js - showPost', postID);
      return $http.get(urlBase + '/' + recruitmentID);
    };

    exports.updateRecruitment = function (recruitmentID, recruitment) {
      // console.log('recruitmentFactory.service.js - updatePost', postID, post);
      return $http.put(urlBase + '/' + recruitmentID, recruitment);
    };

    return exports;

  }

angular
 .module('topshelf.guild')
 .factory('recruitmentFactory', recruitmentFactory);
})();
