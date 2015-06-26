(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.account.controller:ResetCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.account')
    .controller('ResetCtrl', ResetCtrl);

  ResetCtrl.$inject = ['userSrv', 'toastr','$stateParams'];
  /* @ngInject */
  function ResetCtrl(userSrv, toastr, $stateParams) {

    /*jshint validthis: true */
    var vm = this;

    vm.reset = function() {
      userSrv.resetPassword($stateParams.token, {'password': vm.password})
        .then(function(token) {
          toastr.create('Password has been updated');

        })
        .catch(function(response) {
         toastr.create(response.data.message);
        });
    };
  }

})();
