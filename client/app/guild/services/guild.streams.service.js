(function () {
    'use strict';

    angular
        .module('topshelf.guild.services')
        .factory('Streams', Streams);

    function Streams ($http, $rootScope) {
    // Public API here
        return {
        getStreamData: function (channel) {
            return $http({
            method: 'jsonp',
            url: 'https://api.twitch.tv/kraken/streams/' + channel + '?callback=JSON_CALLBACK'
        })
        .success(function(data) {
            $rootScope.$broadcast('event', data);
        })
        .error(function(data, status) {
            console.log('error!', data, status);
        });
        },
      getStreamSoopie: function() {
          return $http({
          method: 'jsonp',
          url: 'https://api.twitch.tv/kraken/streams/Soopie?callback=JSON_CALLBACK'
        })
         .success(function(data) {
             $rootScope.$broadcast('event', data);
             console.log('Soopie stream is working, yo!', data, status);
         });
      },
       getStreamToxic: function() {
           return $http({
            method: 'jsonp',
            url:'https://api.twitch.tv/kraken/streams/Toxicpopsicles?callback=JSON_CALLBACK'
        })
         .success(function(data) {
             $rootScope.$broadcast('event', data);
             console.log('Toxics stream is there', data, status);
         });
       }
    };
    }

})();
