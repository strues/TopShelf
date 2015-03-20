'use strict';
angular.module('app.core.filters').filter('startFrom', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});