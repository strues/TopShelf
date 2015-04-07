(function () {
    'use strict';
    angular.module('app.core').factory('io', IOService);
    // inject IOService dependencies
    IOService.$inject = ['$window'];
    /**
           *
           * IOService constructor
           * @param $window
           * @returns {*}
           * @constructor
           */
    function IOService($window) {
        // remove io from global object
        var io = $window.io;
        delete $window.io;
        return io;
    }
}());
