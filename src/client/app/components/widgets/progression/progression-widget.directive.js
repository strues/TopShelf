(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('progressionWidget', progressionWidget);

  function progressionWidget() {

    var directive = {
      restrict: 'ACE',
      templateUrl: 'app/components/widgets/progression/progression-widget.html',
      scope: {
      },
      controller: 'ProgressionWidgetCtrl',
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

  }

})();
