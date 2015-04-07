(function () {
    'use strict';
    /**
       * @ngdoc Service
       * @name app.guild.services.service:Twitch
       * @desc Communicates with backend handling recruitment status api calls
       */
    angular
      .module('app.guild')
      .service('Twitch', Twitch);
    Twitch.$inject = ['$http'];
    /* @ngInject */
    function Twitch($http) {
        var urlBase = 'https://api.twitch.tv/kraken/streams';
        var cb = '?callback=JSON_CALLBACK';
        var service = {get: get};
        return service;
        function get(streamName) {
            console.log('Getting this ' + streamName);
            return $http.jsonp(urlBase + '/' + streamName + cb);
        }
    }
}());
