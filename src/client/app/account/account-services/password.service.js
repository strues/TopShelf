(function() {
  'use strict';

  angular
    .module('app.account')
    .factory('Password', Password);

  Password.$inject = ['$http'];

  function Password($http) {

    var service = {
      forgotPassword: forgotPassword,
      resetPassword: resetPassword
    };

    return service;

    ////////////////////////////

    function forgotPassword(emailData) {
      return $http.post('/auth/forgot', emailData);
    }

    function resetPassword(token, passwordData) {
      return $http.post('/auth/reset' + token, passwordData);
    }

  }

})();
