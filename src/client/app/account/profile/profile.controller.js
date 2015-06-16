(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['Auth', 'User', 'ngToast'];

  function ProfileCtrl(Auth, User, ngToast) {
    var vm = this;

    //var userRole = Authorization.checkAccess();
    //console.log(userRole);

  }
})();
