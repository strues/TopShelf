(function() {
    'use strict';

    angular
        .module('app.core.services')
        .factory('wowHelper', wowHelper);

    /* @ngInject */
    function wowHelper(wowConstants) {
        return {
            getDecimal: function(num) {
                return +(num.toString().replace('","', '"."'));
            },
            getStatname: function(statId) {
                return wowConstants.itemStats[statId];
            },
            // Returns relevant combined stat
            getCombinedStat: function(stat, mainStat) {
                var relevantStat = '-1';
                angular.forEach(wowConstants.combinedRelevantStats,
                    function(combinedValue, combinedKey) {
                        if (combinedKey == stat) {
                            if (combinedValue.indexOf(mainStat) != -1) relevantStat = mainStat;
                        }
                    });
                return relevantStat;
            },
        };
    }
})();
