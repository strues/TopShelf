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
    function StreamsCtrl($scope, Twitch, $http) {
        /*jshint validthis: true */
        var vm = this;

        $scope.data = [];

        Twitch.get('soopie').success(function(data) {
            $scope.data = data;
        });
    }
})();
