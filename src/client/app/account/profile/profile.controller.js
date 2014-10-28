(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($rootScope, $scope, $state, User) {
        /*jshint validthis: true */
      //  var vm = this;

        var userId = $rootScope.$state.params.id;
        $scope.user = undefined;
        $scope.error = '';

        var user = User.query({ id: userId }, function() {
          $scope.user = user;
        }, function(err) {
          $scope.error = 'Sorry, user not found.';
        });
    }
})();
