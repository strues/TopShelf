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
      controller: 'ProgressionWidgetCtrl'
    };
  }
})();
