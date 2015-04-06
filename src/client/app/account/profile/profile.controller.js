(function () {
    'use strict';
    angular
        .module('app.account')
        .controller('ProfileController', ProfileController);
    /* @ngInject */
    function ProfileController() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileController';
        activate();
        // TODO Implement a members list with this information
        function activate() {
        }
    }
}());
