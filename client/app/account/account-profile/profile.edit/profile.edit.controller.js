(function() {
    'use strict';

    angular
        .module('topshelf.account')
        .controller('ProfileEditCtrl', ProfileEditCtrl);

    /* @ngInject */
    function ProfileEditCtrl(Auth) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileEditCtrl';

    }
})();
