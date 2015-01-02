'use strict';

angular.module('topshelf.core')
.filter('startFrom', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    });
