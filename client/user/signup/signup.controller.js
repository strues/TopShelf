(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.signup.controller:SignupCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.user')
    .controller('SignupCtrl', SignupCtrl);

  function SignupCtrl() {
    var vm = this;
    vm.ctrlName = 'SignupCtrl';
  }

})();
