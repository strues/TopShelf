(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name app.guild.states.controller:ApplicationCtrl
       * @description Form to submit an application
       */
    angular
      .module('app.guild')
      .controller('ApplicationCtrl', ApplicationCtrl);
    /* @ngInject */
    function ApplicationCtrl($location, $http, Application, ngFabForm, toastr) {
        var vm = this;
        vm.ctrlName = 'ApplicationCtrl';
        vm.active = true;
        vm.active1 = true;
        vm.defaultFormOptions = ngFabForm.config;
        vm.customFormOptions = angular.copy(ngFabForm.config);
        vm.realms = [];
        // $http.jsonp('https://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK')
        // .success(function (data, status, headers, config) {
        //     data.realms.map(function (realm) {
        //         vm.realms.push(realm.name);
        //     });
        // }).error(function (data, status, headers, config) {
        // });
        vm.submit = function (formData) {
            Application.createApplication(formData).success(function () {
                vm.processing = false;
                vm.formData = {};
                toastr.success('Thanks for applying', 'App Submitted!');
            }).error(function (error) {
                toastr.error('There was a problem with your post' +
                  error.message, 'Something broke');
            });
        };
        // TODO fix typeahead
        // TODO fix dependency injection errors from fabform
        vm.goBack = function () {
            $location.path('/');
        };
        vm.tooltip = {
            'title': 'Please read about our recruitment process first',
            'checked': false
        };
    }
}());
