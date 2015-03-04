(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name account.account-signup.controller:SignupCtrl
     *
     * @description
     *
     */

    function SignupCtrl() {
        var vm = this;
        vm.ctrlName = 'SignupCtrl';
    }

    angular
        .module('app.account.states')
        .controller('SignupCtrl', SignupCtrl);
})();
