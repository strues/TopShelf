(function() {
    'use strict';

    angular
        .module('topshelf.account.states')
        .controller('ProfileCtrl', ProfileCtrl);

    /* @ngInject */
    function ProfileCtrl() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileCtrl';

        activate();

        function activate() {
        }
    }
})();
