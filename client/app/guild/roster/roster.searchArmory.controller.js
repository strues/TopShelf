(function() {
    'use strict';

    angular
        .module('topshelf.guild')
        .controller('SearchArmoryCtrl', SearchArmoryCtrl);

    /* @ngInject */
    function SearchArmoryCtrl($rootScope, $scope, RosterService, sweet) {
        /*jshint validthis: true */

        $scope.regions = [
            {
                label:'US',
                value: 'us'
            }
        ];

        $scope.findInStorage = function (storageKey) {
            if (typeof (Storage) !== 'undefined') {
                return localStorage.getItem(storageKey);
            }
            return null;
        };

        $scope.realmsCache = {};
        $scope.realms = [];

        $scope.region = $scope.findInStorage('wow-roster-region');
        $scope.$watch('region', function (newRegion) {
            if (newRegion) {
                RosterService.setRegion(newRegion);
                $scope.fetchRealms();
            }
        });
        $scope.realm = $scope.findInStorage('wow-roster-realm');
        $scope.$watch('realm', function (newRealm) {
            if (newRealm) {
                RosterService.setRealm(newRealm);
            }
        });
        $scope.guildName = $scope.findInStorage('wow-roster-guild-name');
        $scope.$watch('guildName', function (newGuildName) {
            RosterService.setGuildName(newGuildName);
        });
        $scope.fetchRealms = function () {
            if ($scope.realmsCache[RosterService.getRegion()] == null) {
                RosterService.getRealms(RosterService.getRegion())
                    .success(function (data) {
                        storeRealms(data, RosterService.getRegion());
                    }).error(function (data, status, headers, config, statusText) {
                        sweet.show('Error!', RosterService.asError(status, statusText));
                    });
            } else {
                // Use realms in cache
                $scope.realms = $scope.realmsCache[$scope.region];
            }

            function storeRealms(data, region) {
                $scope.realmsCache[region] = [];
                angular.forEach(data.realms, function (value) {
                    var realm = {
                        value: value.name,
                        label: value.name + ' (' + value.type.toUpperCase() + ')'
                    };
                    $scope.realmsCache[region].push(realm);
                    $scope.realms = $scope.realmsCache[region];
                });
            }
        };

        $scope.notifyFetchCharacters = function() {
            $rootScope.$broadcast('fetch-characters');
        };

    }
})();
