(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('theFooter', theFooter);

  /* @ngInject */
  function theFooter() {
    var directive = {
      bindToController: true,
      controller: FooterCtrl,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: 'app/core/layout/the-footer.tpl.html'
    };

    /* @ngInject */
    function FooterCtrl() {
      var vm = this;
      vm.ctrl = 'crtlName';
    }

    return directive;
  }
})();
