(function () {
    'use strict';
    /**
     * @ngdoc Controller
     * @name app.guild.controller:GuildInfoController
     *
     * @description Currently is just "there"
     *
     */
    angular
      .module('app.guild')
      .controller('GuildInfoController', GuildInfoController);
    /* @ngInject */
    function GuildInfoController() {
        var vm = this;
        vm.ctrlName = 'GuildInfoController';
    }
}());
