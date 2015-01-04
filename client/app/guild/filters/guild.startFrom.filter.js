(function () {
    'use strict';

    angular
        .module('topshelf.guild.filters')
        .filter('startFrom', startFrom);

    function startFrom () {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    }
})();
