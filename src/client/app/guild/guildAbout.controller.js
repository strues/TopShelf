(function() {
    'use strict';

    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);


    function AboutCtrl($scope, battleNetApi) {
      /*
       * Broken thanks to Blizzard atm
            battleNetApi.wow.guild.profile({ name: 'Top Shelf' , realm: 'Sargeras' }).then(function(displayCharacter) {
            $scope.displayCharacter = displayCharacter;

            });
        */
    }
})();
