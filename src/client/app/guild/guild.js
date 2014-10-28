(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('guild', {
                    url: '/guild/about',
                    templateUrl: 'app/guild/about.tpl.html',
                    controller: 'AboutCtrl'
                });
        });
})();
