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

  ResetCtrl.$inject = ['userSrv', 'ngToast','$stateParams'];
  /* @ngInject */
  function ResetCtrl(userSrv, ngToast, $stateParams) {

    /*jshint validthis: true */
    var vm = this;

    vm.reset = function() {
      userSrv.resetPassword($stateParams.token, {'password': vm.password})
        .then(function(token) {
          ngToast.create('Password has been updated');

        })
        .catch(function(response) {
         ngToast.create(response.data.message);
        });
    };
  }

})();
