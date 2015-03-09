(function() {
    'use strict';
  /**
   * @ngdoc controller
   * @name StreamsCtrl
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
        // TODO setup repeat for streamName to display multiple
        // streams without repeating code.
        $scope.data = {};
        var streamName = 'soopie';
        Twitch.get(streamName).success(function(data) {
            $scope.stream = data.stream;
        });

        $rootScope.openStream = function(streamName) {
		// Set stream active to true, and apply scope
            $rootScope.streamName = streamName;
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
    }
})();
