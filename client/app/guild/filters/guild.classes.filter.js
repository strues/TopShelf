(function () {
  'use strict';

angular.module('topshelf.guild.filters')
  .filter('guildRank', guildRank);

  function guildRank () {
   return function(input){
      switch(input){
        case 0:
          return 'GM';
        case 1:
          return 'Assistant GM';
        case 2:
          return 'Officer';
        case 3:
          return 'Officer Alt';
        case 4:
          return 'Council';
        case 5:
          return 'Raider';
        case 6:
          return 'Raider Alt';
        case 7:
          return 'Friends & Family';
        case 8:
          return 'Trial';
        case 9:
          return 'Social / Alt';

      }
    }
  };

})();
