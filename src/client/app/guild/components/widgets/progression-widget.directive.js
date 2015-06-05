(function() {
  'use strict';

  angular
    .module('app.guild')
    .directive('progressionWidget', progressionWidget);

  function progressionWidget() {

    var directive = {
      restrict: 'ACE',
      templateUrl: 'app/guild/components/widgets/progression-widget.html',
      scope: {
      },
      controller: 'myController',
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

  }

})();
