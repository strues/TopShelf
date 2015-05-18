(function() {
  'use strict';
  angular
      .module('app.guild')
      .directive('progressionWidget', progressionWidget);

  function progressionWidget() {
    return {
      templateUrl:
      'app/guild/guild-directives/progressionWidget/progressionWidget.tpl.html',
      restrict: 'EA',
      /* @ngInject */
      controller: function($scope, Progression) {
        Progression.all().success(function(data) {
          $scope.charData = data;
        });
      }
    };
  }
})();
