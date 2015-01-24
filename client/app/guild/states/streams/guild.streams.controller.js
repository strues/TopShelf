(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name guild.recruitment.controller:StreamCtrl
   *
   * @description
   *
   */
    angular
        .module('topshelf.guild.states')
        .controller('StreamCtrl', StreamCtrl);

    function StreamCtrl($scope, $rootScope, $location, toastr, Streams) {

    toastr.warning('Streams are offline if the page is empty',
      'This page loads direct videos from Twitch');

    $scope.allStreams = [
      // List of stream names of TI streams.
      'gamesdonequick',
      'toxicpopsicles',
      'teomorassalt'

    ];

    $scope.streamsList = [];

    $scope.$on('event', function(event, data) {
        $scope.streamOb = data;
        $scope.streamsList.push(data);
        console.log(data);
    });

    Streams.getStreamSoopie(function (event, data) {
        $scope.data = data;
    });
    Streams.getStreamToxic(function (event, data) {
        $scope.data = data;
    });
    Streams.getStreamTeo(function (event, data) {
        $scope.data = data;
    });
    Streams.getStreamValk(function (event, data) {
        $scope.data = data;
    });

    $rootScope.openStream = function(streamName) {
    // Set stream active to true, and apply scope
        $rootScope.streamName = streamName;
        $rootScope.streamActive = true;
    // Open stream with streamers name

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
        if(e.which === 27) {
            $rootScope.closeStream();
         }
    });


    // If user leaves the page while a stream is active promt them!
    $(window).on('beforeunload', function() {
        if ($rootScope.streamActive === true)
            return 'Leave?';
    });

}

})();
