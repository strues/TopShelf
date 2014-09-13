(function() {

    'use strict';

    function AboutCtrl() {

        var vm = this;

        vm.oneAtATime = true;

        vm.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

        vm.items = ['Item 1', 'Item 2', 'Item 3'];


        vm.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }

    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);
})();