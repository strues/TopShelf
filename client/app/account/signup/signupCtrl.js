(function() {

'use strict';
      
      function SignupCtrl (Auth, $location, $window) {
        var vm = this;

        vm.user = {};
        vm.errors = {};

          vm.register = function(form) {
            vm.submitted = true;

            if(form.$valid) {
              Auth.createUser({
                userName: vm.user.userName,
                email: vm.user.email,
                password: vm.user.password
              })
              .then( function() {
                $location.path('/');
              })
              .catch( function(err) {
                err = err.data;
                vm.errors = {};

                angular.forEach(err.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  vm.errors[field] = error.message;
                });
              });
            }
      };

}

angular
  .module('app')
  .controller('SignupCtrl', SignupCtrl);
})();