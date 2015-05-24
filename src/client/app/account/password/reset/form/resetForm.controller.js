(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('ResetFormCtrl', ResetFormCtrl);

  ResetFormCtrl.$inject = ['$auth', '$stateParams', 'Password'];

  function ResetFormCtrl($auth, $stateParams, Password) {

    /*jshint validthis: true */
    var vm = this;

    vm.reset = function() {
      Password.resetPassword($stateParams.token, {
          'password': vm.password
        })
        .then(function(token) {
          Materialize.toast('Password has been updated', 3000);
          $auth.setToken(token, true);
        })
        .catch(function(response) {
          Materialize.toast(response.data.message, 3000);
        });
    };

  }

})();
