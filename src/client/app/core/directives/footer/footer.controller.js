(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name topshelf.core.controller:FooterCtrl
     *
     * @description
     *
     */

angular.module('app.core.directives').controller('FooterCtrl', FooterCtrl);
    function FooterCtrl($scope, Auth, Twitch) {
        var vm = this;
        vm.Auth = Auth;

        var streamName1 = 'Soopie';
        var streamName2 = 'Toxicpoptart';
        var streamName3 = 'Teodin';
        var streamName4 = 'Valkr';
        var streamName5 = 'Tinkerbell';

        Twitch.get(streamName1).success(function(data) {
            $scope.stream1 = data.stream;
        });

        Twitch.get(streamName2).success(function(data) {
            $scope.stream2 = data.stream;
        });

        Twitch.get(streamName3).success(function(data) {
            $scope.stream3 = data.stream;
        });

        Twitch.get(streamName4).success(function(data) {
            $scope.stream4 = data.stream;
        });

        Twitch.get(streamName5).success(function(data) {
            $scope.stream5 = data.stream;
        });
    }

}());
