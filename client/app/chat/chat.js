(function() {

    'use strict';

    function config ($stateProvider) {
        $stateProvider
            .state('chat', {
                url: '/chat',
                templateUrl: 'app/chat/chat.tpl.html',
                controller: 'ChatCtrl'
            });
    }

    angular
        .module('app')
        .config(config);
})();