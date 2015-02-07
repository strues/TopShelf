(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name ApplicationCtrl
     * @propertyOf topshelf.guild.states
     * @requires (form-for, toastr)
     * @description Form to submit an application
     */
    angular
        .module('app.guild.states')
        .controller('ApplicationCtrl', ApplicationCtrl);
    /* @ngInject */
    function ApplicationCtrl($scope, $location, $http, Application, ngFabForm, toastr) {

        $scope.defaultFormOptions = ngFabForm.config;
        $scope.customFormOptions = angular.copy(ngFabForm.config);

        $scope.realms = [];

        /*
         * @ngdoc object
         * @description Returns a list of realms from battle.net
         */
        $http.jsonp('https://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK')
            .success(function(data, status, headers, config) {
                data.realms.map(function(item) {
                    $scope.realms.push(item.name);
                });
            }).error(function(data, status, headers, config) {

            });

        $scope.submit = function(formData) {
            Application.createApplication(formData)
                .success(function() {
                    $scope.processing = false;
                    $scope.formData = {};
                    toastr.success('Your application submitted successfully', 'App Submitted!');
                })
                .error(function(error) {
                    toastr.error('There was a problem with your post' + error.message,
                        'Something broke');
                });
        };

        $scope.goBack = function() {
            $location.path('/');
        };

    }
})();
