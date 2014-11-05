(function () {
  'use strict';

angular
 .module('topshelf.guild')
 .factory('recruitmentFactory', recruitmentFactory);

 function recruitmentFactory ($http) {
    // console.log('recruitmentFactory.service.js');

    var urlBase = 'api/recruitment';
    var recruitmentFactory = {};

    recruitmentFactory.getRecruitment = function () {
      // console.log('recruitmentFactory.service.js - getPosts');
      return $http.get(urlBase);
    };

    recruitmentFactory.createRecruitment = function (recruitment) {
      // console.log('recruitmentFactory.service.js - createPosts', post);
      return $http.post(urlBase, recruitment)
    };

    recruitmentFactory.deleteRecruitment = function (recruitmentID) {
      // console.log('recruitmentFactory.service.js - deletePosts', postID);
      return $http.delete(urlBase + '/' + recruitmentID)
    };

    recruitmentFactory.showRecruitment = function (recruitmentID) {
      // console.log('recruitmentFactory.service.js - showPost', postID);
      return $http.get(urlBase + '/' + recruitmentID)
    };

    recruitmentFactory.updateRecruitment = function (recruitmentID, recruitment) {
      // console.log('recruitmentFactory.service.js - updatePost', postID, post);
      return $http.put(urlBase + '/' + recruitmentID, recruitment)
    };

    return recruitmentFactory;

  };

})();
