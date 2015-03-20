'use strict';
angular.module('app.core.filters').filter('className', function () {
    return function (classId) {
        switch (classId) {
        case 1:
            return 'Warrior';
        case 2:
            return 'Paladin';
        case 3:
            return 'Hunter';
        case 4:
            return 'Rogue';
        case 5:
            return 'Priest';
        case 6:
            return 'Deathknight';
        case 7:
            return 'Shaman';
        case 8:
            return 'Mage';
        case 9:
            return 'Warlock';
        case 10:
            return 'Monk';
        case 11:
            return 'Druid';
        }
    };
});