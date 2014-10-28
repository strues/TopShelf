(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);


    function LoginCtrl($window, $scope, $location, Auth) {
        /*jshint validthis: true */
        //var $scope = this;

      $scope.user = {};
      $scope.errors = {};

      $scope.login = function(form) {
        $scope.submitted = true;

          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
        });

      };

}
})();
