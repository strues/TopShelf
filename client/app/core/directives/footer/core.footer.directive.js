(function () {
    'use strict';

  /**
   * @ngdoc directive
   * @name core.directive:footer
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   *
   */

    function theFooter() {
        return {
      restrict: 'EA',
      templateUrl: 'app/core/directives/footer/core.footer.tpl.html',
      controller: 'FooterCtrl',
      controllerAs: 'vm'
    };
    }

    angular
        .module('topshelf.core')
        .directive('theFooter', theFooter);
})();
