(function() {
    'use strict';

    angular
        .module('app')
        .controller('Community', Community);


    function Community(User) {
        /*jshint validthis: true */
       // var vm = this;


        vm.users = User.query(function() {
        //query() returns all the entries
        });

    }
})();
