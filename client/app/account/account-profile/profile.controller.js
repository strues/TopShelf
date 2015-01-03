(function() {
    'use strict';

    angular
        .module('topshelf.account')
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
