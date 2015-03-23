(function () {
    'use strict';
    /**
     * @ngdoc controller
     * @name app.guild.states.controller:ApplicationCtrl
     * @description Form to submit an application
     */
    angular.module('app.guild.states').controller('ApplicationCtrl', ApplicationCtrl);
    /* @ngInject */
    function ApplicationCtrl($scope, $location, $http, Application, ngFabForm, toastr) {
        $scope.active = true;
        $scope.active1 = true;
        $scope.defaultFormOptions = ngFabForm.config;
        $scope.customFormOptions = angular.copy(ngFabForm.config);
        $scope.realms = [];
        $http.jsonp('https://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK')
        .success(function (data, status, headers, config) {
            data.realms.map(function (realm) {
                $scope.realms.push(realm.name);
            });
        }).error(function (data, status, headers, config) {
        });
        $scope.submit = function (formData) {
            Application.createApplication(formData).success(function () {
                $scope.processing = false;
                $scope.formData = {};
                toastr.success('Your application submitted successfully', 'App Submitted!');
            }).error(function (error) {
                toastr.error('There was a problem with your post' + error.message, 'Something broke');
            });
        };
        // TODO remove scope
        // TODO fix typeahead
        // TODO fix dependency injection errors from fabform
        $scope.goBack = function () {
            $location.path('/');
        };
        $scope.tooltip = {
            'title': 'Please read about our recruitment process first',
            'checked': false
        };
    }
}());
