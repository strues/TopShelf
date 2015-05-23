(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('ForgotCtrl', ForgotCtrl);

  ForgotCtrl.$inject = ['Password'];

  function ForgotCtrl(Password) {

    /*jshint validthis: true */
    var vm = this;

    vm.forgot = function() {
      Password.forgotPassword({
          'email': vm.email
        })
        .then(function() {
          Materialize.toast('Email has been sent', 3000);
        })
        .catch(function(response) {
          Materialize.toast(response.data.message, 3000);
        });
    };
  }

})();
