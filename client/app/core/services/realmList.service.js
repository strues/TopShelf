(function() {
'use strict';

    function RealmListService($http, $q, $log) {

        return {
            getRealms: function() {
                $log.log('Fetching server list for us...');
                var usPromise = $http.jsonp('http://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK');

                return $q.all([usPromise]);
            }
        };
    }
     angular
        .module('topshelf.core')
        .factory('RealmListService', RealmListService);
})();