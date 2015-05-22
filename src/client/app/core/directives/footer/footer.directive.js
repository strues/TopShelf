(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name app.core.directive:footer
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   *
   */
  angular
    .module('app.core')
    .directive('theFooter', theFooter);
  function theFooter() {
    return {
      restrict: 'EA',
      templateUrl: 'app/core/directives/footer/footer.tpl.html',
      controller: 'FooterCtrl'
    };
  }

}());
