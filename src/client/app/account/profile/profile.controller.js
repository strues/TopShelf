(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['Auth', 'User', 'toastr'];

  function ProfileCtrl(Auth, User, toastr) {
    var vm = this;

    //var userRole = Authorization.checkAccess();
    //console.log(userRole);

  }
})();
