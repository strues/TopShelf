(function () {
  'use strict';

angular.module('topshelf.core')
  .filter('characterRace', characterRace);

  function characterRace () {
   return function(input){
      switch(input){
        case 1:
          return 'Human';
        case 2:
          return 'Orc';
        case 3:
          return 'Dwarf';
        case 4:
          return 'Night Elf';
        case 5:
          return 'Undead';
        case 6:
          return 'Tauren';
        case 7:
          return 'Gnome';
        case 8:
          return 'Troll';
        case 9:
          return 'Goblin';
        case 10:
          return 'Blood Elf';
        case 11:
          return 'Draenei';
        case 22:
          return 'Worgen';
        case 25:
          return 'Pandaren';

      }
    }
  };

})();
