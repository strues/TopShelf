(function () {
    'use strict';
    /**
       * @ngdoc object
       * @name app.core.controller:FooterCtrl
       *
       * @description
       *
       */
    angular
      .module('app.core')
      .controller('FooterCtrl', FooterCtrl);
          /* @ngInject */
    function FooterCtrl() {
      var vm = this;
      vm.ctrlName = 'footer';
    }
}());
