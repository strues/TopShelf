(function () {
  'use strict';

  angular
    .module('app')
    .controller('GuildInfoCtrl', GuildInfoCtrl);

    function GuildInfoCtrl($scope, wowApi){
      wowApi.guild.members({ name: 'Top Shelf', realm: 'Sargeras' }).then(function (data){
          $scope.error = {};
          $scope.guild = data;




      })
    }
})();
