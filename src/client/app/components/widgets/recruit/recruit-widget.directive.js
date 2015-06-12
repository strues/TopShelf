(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('recruitingWidget', recruitingWidget);

  function recruitingWidget() {

    var directive = {
      restrict: 'ACE',
      templateUrl: 'app/components/widgets/recruit/recruit-widget.html',
      scope: {
      },
      controller: 'RecruitingWidgetCtrl',
      controllerAs: 'rwidget',
      bindToController: true
    };
    return directive;
  }

})();
