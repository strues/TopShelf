(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name app.guild.states:StreamsCtrl
       *
       * @description pulls streams from the Twitch.tv API
       *
       */
    angular
      .module('app.guild')
      .controller('StreamsCtrl', StreamsCtrl);
                         /* @ngInject */
    function StreamsCtrl($rootScope, $scope, $location, Twitch, $http) {
        $scope.data = {};
        var streamName1 = 'Soopie';
        var streamName2 = 'toxicpopsicles';
        var streamName3 = 'teomorassalt';
        var streamName4 = 'valkyrie89';
        var streamName5 = 'wtfbbqsaucee';
        var streamName6 = 'bredba';
        Twitch.get(streamName1).success(function (data) {
            $scope.stream1 = data.stream;
        });
        Twitch.get(streamName2).success(function (data) {
            $scope.stream2 = data.stream;
        });
        Twitch.get(streamName3).success(function (data) {
            $scope.stream3 = data.stream;
        });
        Twitch.get(streamName4).success(function (data) {
            $scope.stream4 = data.stream;
        });
        Twitch.get(streamName5).success(function (data) {
            $scope.stream5 = data.stream;
        });
        Twitch.get(streamName6).success(function (data) {
            $scope.stream6 = data.stream;
        });
        $rootScope.openStream = function (streamName) {
            // Set stream active to true, and apply scope
            $rootScope.streamName = streamName;
            $rootScope.streamActive = true;
        };
        $rootScope.closeStream = function () {
            // Set stream active to false, and apply scope
            $rootScope.streamActive = false;
        };
        // Binds event handler to ESCAPE key to exit stream
        $(window).on('keydown', function (e) {
            if (e.which === 27) {
                $rootScope.closeStream();
            }
        });
        // If user leaves the page while a stream is active promt them!
        $(window).on('beforeunload', function () {
            if ($rootScope.streamActive === true) {
                return 'Leave?';
            }
        });
        $scope.previewHover = function ($event, isHover) {
            if ($event.toElement &&
              $event.toElement.className.indexOf('btn-preview-close') === -1) {
                $scope.showCloseButton = isHover;
            }
        };
    }
}());
