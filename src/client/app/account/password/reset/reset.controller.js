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

  ResetCtrl.$inject = ['userSrv', 'toastr', '$auth', '$stateParams'];
  /* @ngInject */
  function ResetCtrl(userSrv, toastr, $auth, $stateParams) {

    /*jshint validthis: true */
    var vm = this;

    vm.reset = function() {
      userSrv.resetPassword($stateParams.token, {'password': vm.password})
        .then(function(token) {
          toastr.success('Password has been updated');
          $auth.setToken(token, true);
        })
        .catch(function(response) {
          toastr.info(response.data.message);
        });
    };
  }

})();
