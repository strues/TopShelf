(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.guild.states.controller:ApplicationCtrl
     * @description Form to submit an application
     */
    angular
        .module('app.guild.states')
        .controller('ApplicationCtrl', ApplicationCtrl);

    ApplicationCtrl.$inject = ['$scope', '$http', '$location', 'Application', 'ngFabForm', 'toastr'];
    /* @ngInject */
    function ApplicationCtrl($scope, $location, $http, Application, ngFabForm, toastr) {

        $scope.defaultFormOptions = ngFabForm.config;
        $scope.customFormOptions = angular.copy(ngFabForm.config);

        $scope.realms = [];

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
