(function() {
  'use strict';

  angular
    .module('app.guild')
    .directive('recruitingWidget', recruitingWidget);

  function recruitingWidget() {

    var directive = {
      restrict: 'ACE',
      templateUrl: 'app/guild/components/widgets/recruit-widget.html',
      scope: {
      },
      controller: 'RecruitingWidgetCtrl',
      controllerAs: 'rwidget',
      bindToController: true
    };
    return directive;
  }

})();
