(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('community', {
                    url: '/community',
                    templateUrl: 'app/community/community.tpl.html',
                    controller: 'CommunityCtrl'
                });
        });
})();
