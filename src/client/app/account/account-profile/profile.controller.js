(function () {
    'use strict';
    angular.module('app.account.states').controller('ProfileCtrl', ProfileCtrl);
    /* @ngInject */
    function ProfileCtrl() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileCtrl';
        activate();
        // TODO Implement a members list with this information
        function activate() {
        }
    }
}());