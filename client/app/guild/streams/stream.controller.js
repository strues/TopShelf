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
    .module('topshelf.guild')
    .controller('StreamCtrl', StreamCtrl);

  function StreamCtrl($scope, $rootScope, toastr, Streams) {
    toastr.info('Streams are offline if the page is empty');

    $scope.allStreams = [
      // List of stream names of TI streams.
      'Soopie',
      'toxicpopsicles'

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

$rootScope.openStream = function(streamName) {
    // Set stream active to true, and apply scope
    $rootScope.streamName = streamName;
    $rootScope.streamActive = true;
    // Open stream with streamers name

  };

}

})();
