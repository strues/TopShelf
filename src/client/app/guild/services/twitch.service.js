(function () {
    'use strict';
    /**
     * @ngdoc Service
     * @name app.guild.services.service:Twitch
     * @desc Communicates with backend handling recruitment status api calls
     */
    angular.module('app.guild.services').service('Twitch', Twitch);
    Twitch.$inject = ['$http'];
    /* @ngInject */
    function Twitch($http) {
        var urlBase = 'https://api.twitch.tv/kraken/streams';
        var cb = '?callback=JSON_CALLBACK';
        var service = { get: get };
        return service;
        function get(streamId) {
            console.log('Getting this ' + streamId);
            return $http.jsonp(urlBase + '/' + streamId + cb);
        }
    }
}());