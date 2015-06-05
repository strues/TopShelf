(function() {
  'use strict';

/**
 * @ngdoc service
 * @name app.common.twitchSvc
 * @description < description placeholder >
 */

  angular
    .module('app.common')
    .factory('twitchSvc', twitchSvc);

  twitchSvc.$inject = ['$http', '$q'];
  /* @ngInject */
  function twitchSvc($http, $q) {

    var apiBase = 'https://api.twitch.tv/kraken/streams?channel=';
    var service = {
      getStream: getStream
    };

    return service;

    ////////////////////////////

    function getStream(channel) {
      var deferred = $q.defer();

      $http.jsonp(apiBase + channel + '&callback=JSON_CALLBACK')
      .success(function(data) {
        deferred.resolve(data);
      }).error(function() {deferred.reject();});

      return deferred.promise;
    }

  }

})();
