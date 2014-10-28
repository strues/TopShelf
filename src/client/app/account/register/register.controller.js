(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($rootScope, $scope, $window, $location, Auth) {
        /*jshint validthis: true */
    //var vm = this;
        $scope.user = {};
        $scope.errors = {};

    $scope.register = function(form) {
        $scope.submitted = true;
        $rootScope.errorMessages = {};

      Auth.createUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function() {
          $location.path('/')
      });
    };
    }
})();
