(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name topshelf.core.controller:FooterCtrl
   *
   * @description
   *
   */


  function FooterCtrl(Auth) {
    var vm = this;

    vm.Auth = Auth;
  }

  angular
    .module('topshelf.core')
    .controller('FooterCtrl', FooterCtrl);
})();
