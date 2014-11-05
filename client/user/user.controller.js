(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.controller:UserCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.user')
    .controller('UserCtrl', UserCtrl);

  function UserCtrl() {
    var vm = this;
    vm.ctrlName = 'UserCtrl';
  }

})();
