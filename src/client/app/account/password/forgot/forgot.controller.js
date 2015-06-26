(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.account.controller:ForgotCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.account')
    .controller('ForgotCtrl', ForgotCtrl);

  ForgotCtrl.$inject = ['userSrv', 'toastr'];
  /* @ngInject */
  function ForgotCtrl(userSrv, toastr) {

    /*jshint validthis: true */
    var vm = this;

    vm.forgot = function() {
      userSrv.forgotPassword({'email': vm.email})
         .then(function() {
           toastr.create('Email has been sent');
         })
         .catch(function(response) {
           toastr.create(response.data.message);
         });
     };

  }

})();
