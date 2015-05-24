(function () {
  'use strict';
  angular
    .module('app.guild')
    .directive('recruitmentWidget', recruitmentWidget);

  function recruitmentWidget() {
    return {
      templateUrl:
      'app/guild/guild-directives/recruitmentWidget/recruitmentWidget.tpl.html',
      restrict: 'EA',
      controller: 'RecruitmentWidgetCtrl'
    };
  }

}());
