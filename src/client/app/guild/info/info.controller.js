(function() {

 /**
  * @ngdoc controller
  * @name app.guild.controller:InfoCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.guild')
    .controller('InfoCtrl', InfoCtrl);

  InfoCtrl.$inject = [];
  /* @ngInject */
  function InfoCtrl() {

    /*jshint validthis: true */
    var vm = this;

    vm.controllerName = 'GuildInfo';

  }

})();
