'use strict';
angular.module('app.core.filters').filter('rankName', function () {
    return function (rankId) {
        switch (rankId) {
        case 0:
            return 'Guild Master';
        case 1:
            return 'Guild Commander';
        case 2:
            return 'Commander Alt';
        case 3:
            return 'Veteran Raider';
        case 4:
            return 'Raider';
        case 5:
            return 'Raiding Alt';
        case 6:
            return 'Probationary';
        }
    };
});