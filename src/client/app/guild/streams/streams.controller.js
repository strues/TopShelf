(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.guild.controller:StreamsCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.guild')
    .controller('StreamsCtrl', StreamsCtrl);

  StreamsCtrl.$inject = ['twitchSvc'];
  /* @ngInject */
  function StreamsCtrl(twitchSvc) {

    /*jshint validthis: true */
    var vm = this;
    vm.channel = 'slootbag';
    getStreamData();

    ////////////////////////////

    vm.streamData = {};
    vm.activeStream = false;

    function getStreamData(channel) {
      twitchSvc.getStream(channel).then(function(data) {
        vm.streamData = data;
      });
    }
  }
})();
