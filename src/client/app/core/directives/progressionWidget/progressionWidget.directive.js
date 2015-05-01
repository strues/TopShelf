(function () {
  'use strict';
  angular
    .module('app.core')
    .directive('progressionWidget', progressionWidget);
  function progressionWidget() {
    return {
      templateUrl:
      'app/core/directives/progressionWidget/progressionWidget.tpl.html',
      restrict: 'EA',    /* @ngInject */
      controller: function ($scope, $http, Progression, $log, $templateCache) {
        // Progression.all().success(function (data) {
        //     $scope.progressions = data;
        //     $scope.status = data.dead;  //TODO better way to use ng-class?
        // }).error(function (error) {
        //     $scope.status = 'Unable to retrieve progression info: ' +
        //      error.message;
        // });
        var urlBase = 'https://us.api.battle.net/wow/character/';
        var jspcb = 'jsonp=JSON_CALLBACK';
        var apiKey = 'apikey=urtsw3rtx2p5x4hy48efamnw39x8s7qw';
        var loc = 'locale=en_US';
        var realm = 'Sargeras';
        var toon = 'Teodin';

        $http.jsonp(urlBase + realm + '/' +
          toon + '?fields=items%2C+progression' +
          '&' + loc + '&' + jspcb + '&' + apiKey, {
            headers: {'Accept-Encoding': 'gzip'}, cache: $templateCache})
                .success(function (data, headers) {
                  $scope.charData = data;
                });
      }
    };
  }
}());
