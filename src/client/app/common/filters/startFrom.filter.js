'use strict';
angular
  .module('app.common')
  .filter('startFrom', function () {
    return function (input, start) {
      start = parseInt(input, 10);
      return input.slice(start);
    };
  });
