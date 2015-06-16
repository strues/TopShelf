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

  ForgotCtrl.$inject = ['userSrv', 'ngToast'];
  /* @ngInject */
  function ForgotCtrl(userSrv, ngToast) {

    /*jshint validthis: true */
    var vm = this;

    vm.forgot = function() {
      userSrv.forgotPassword({'email': vm.email})
         .then(function() {
           ngToast.create('Email has been sent');
         })
         .catch(function(response) {
           ngToast.create(response.data.message);
         });
     };

  }

})();
