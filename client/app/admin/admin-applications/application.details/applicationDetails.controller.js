(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name admin.admin-recruitment.controller:ApplicationListCtrl
     *
     * @description
     *
     */
    angular
        .module('app.admin.states')
        .controller('ApplicationViewCtrl', ApplicationViewCtrl);
    /* @ngInject */
    function ApplicationViewCtrl($scope, $http, $stateParams, Application, $location) {

        var applicationId = $stateParams.id;
        var urlBase = 'https://us.api.battle.net/wow/character/';
        var jspcb = 'jsonp=JSON_CALLBACK';
        var apiKey = 'apikey=jbdqc3ufm6hfzpymxc3ej52988vvh59b';
        var loc = 'locale=en_US';
        /*
         * @todo refactor into its own service
         */
        if (applicationId && applicationId.length > 0) {
            $http.get('/api/admin-applications/' + applicationId)
                .success(function(application) {
                    $scope.application = application;
                    $http.jsonp(urlBase + application.charServer + '/' + application.charName +
                        '?fields=items%2C+progression' + '&' + loc + '&' + jspcb + '&' + apiKey, {
                            headers: {
                                'Accept-Encoding': 'gzip'
                            }
                        })
                        .success(function(data, headers) {
                            $scope.charData = data;
                        });
                });
        }

        $scope.saveApplication = function() {
            if (applicationId && applicationId.length > 0) {
                $http.put('/api/admin-applications/' + applicationId,
                    $scope.application).success(function(application) {
                    $location.path('/admin/admin-applications');
                });
            } else {
                $http.post('/api/admin-applications', $scope.application)
                    .success(function(application) {
                        $location.path('/admin/admin-applications');
                    });
            }
        };

        $http.get('/api/admin-applications').success(function(applications) {
            $scope.applicationList = applications;
        });
    }

})();
