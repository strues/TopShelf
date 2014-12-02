/**
 * application.service.js in web
 */
(function () {
  'use strict';

  function ApplicationFactory ($http) {
    console.log('application.service.js');

    var urlBase = 'api/applications';
    var exports = {};

    exports.getAllApplications = function(){
      return $http.get(urlBase);
    };

    exports.getApplicationById = function(applicationId){
      return $http.get(urlBase + '/' + applicationId);
    };

    exports.createApplication = function(newApplication){
      return $http.post(urlBase, newApplication);
    };

    exports.updateApplication = function(updatedApplication){
      return $http.put(urlBase + '/' + updatedApplication._id, updatedApplication);
    };

    exports.removePost = function(applicationId){
      return $http.delete(urlBase + '/' + applicationId);
    };

    exports.likeApplication = function(applicationId) {
      return $http.post(urlBase + '/' + applicationId);
    };

    exports.unlikeApplication = function(applicationId) {
      return $http.put(urlBase + '/' + applicationId);
    };

    return exports;

  }

  angular
    .module('topshelf.core')
    .factory('ApplicationFactory', ApplicationFactory);
})();
