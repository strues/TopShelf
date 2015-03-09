(function() {
    'use strict';
  /**
   * @ngdoc controller
   * @name app.guild.states:StreamsCtrl
   *
   * @description pulls streams from the Twitch.tv API
   *
   */
    angular
        .module('app.guild.states')
        .controller('StreamsCtrl', StreamsCtrl);

    /* @ngInject */
    function StreamsCtrl($rootScope, $scope, $location, Twitch, $http) {
        /*jshint validthis: true */
        var vm = this;
        // TODO setup repeat for streamName to display multiple streams without repeating code.

        $scope.data = {};
        var streamName1 = 'soopie';
        Twitch.get(streamName1).success(function(data) {
            $scope.stream = data.stream;
        });

        // TODO customize the stream viewer so that the popup window doesnt get covered by the navbar.
        $rootScope.openStream1 = function(streamName1) {
		// Set stream active to true, and apply scope
            $rootScope.streamName1 = streamName1;
            $rootScope.streamActive = true;
        };

        var streamName2 = 'toxicpopsicles';
        Twitch.get(streamName2).success(function(data) {
            $scope.stream = data.stream;
        });

        $rootScope.openStream2 = function(streamName2) {
		// Set stream active to true, and apply scope
            $rootScope.streamName2 = streamName2;
            $rootScope.streamActive = true;
        };

        var streamName3 = 'teomorassalt';
        Twitch.get(streamName3).success(function(data) {
            $scope.stream = data.stream;
        });

        $rootScope.openStream3 = function(streamName3) {
		// Set stream active to true, and apply scope
            $rootScope.streamName3 = streamName3;
            $rootScope.streamActive = true;
        };

        var streamName4 = 'valkyrie89';
        Twitch.get(streamName4).success(function(data) {
            $scope.stream = data.stream;
        });

        $rootScope.openStream4 = function(streamName4) {
        // Set stream active to true, and apply scope
            $rootScope.streamName4 = streamName4;
            $rootScope.streamActive = true;
        };

        var streamName5 = 'wtfbbqsaucee';
        Twitch.get(streamName5).success(function(data) {
            $scope.stream = data.stream;
        });

        $rootScope.openStream5 = function(streamName5) {
        // Set stream active to true, and apply scope
            $rootScope.streamName5 = streamName5;
            $rootScope.streamActive = true;
        };
        $rootScope.closeStream = function() {
		// Set stream active to false, and apply scope
            $rootScope.streamActive = false;
		// Go back to the last route in our history
            console.log(window.history);
            window.history.back();
        };
        // Binds event handler to ESCAPE key to exit stream
        $(window).on('keydown', function(e) {
            if (e.which === 27) {
                $rootScope.closeStream();
            }
        });

    // If user leaves the page while a stream is active promt them!
        $(window).on('beforeunload', function() {
            if ($rootScope.streamActive === true)
        {
                return 'Leave?';
            }
        });
        $scope.previewHover = function ($event, isHover) {
         if ($event.toElement && $event.toElement.className.indexOf('btn-preview-close') === -1) {
             $scope.showCloseButton = isHover;
         }
     };
    }
})();
