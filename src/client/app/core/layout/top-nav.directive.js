(function() {
  'use strict';

  angular
      .module('app.core')
      .directive('topNav', topNav);

  /* @ngInject */
  function topNav() {
    var directive = {
      bindToController: true,
      controller: TopNavCtrl,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: 'app/core/layout/top-nav.tpl.html'
    };

    TopNavCtrl.$inject = ['$scope', '$location', '$auth', 'userData'];
    /* @ngInject */
    function TopNavCtrl($scope, $location, $auth, userData) {
      // controllerAs ViewModel
      var vm = this;

      /**
       * Log the user out of whatever authentication they've signed in with
       */
      vm.logout = function() {
        vm.adminUser = undefined;
        $auth.logout()
                    .then(function() {
                      Materialize.toast('See ya later', 3000); // jshint ignore:line
                    });
      };

      /**
       * If user is authenticated and adminUser is undefined,
       * get the user and set adminUser boolean.
       *
       * Do this on first controller load (init, refresh)
       * and subsequent location changes (ie, catching logout, login, etc).
       *
       * @private
       */
      function _checkUserAdmin() {
        // if user is authenticated and not defined yet, check if they're an admin
        if ($auth.isAuthenticated() && vm.adminUser === undefined) {
          userData.getUser()
                        .then(function(data) {
                          vm.adminUser = data.isAdmin;
                        });
        }
      }

      _checkUserAdmin();
      $scope.$on('$locationChangeSuccess', _checkUserAdmin);

      /**
       * Is the user authenticated?
       * Needs to be a function so it is re-executed
       *
       * @returns {boolean}
       */
      vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      vm.isAdmin = function() {
        var payload = $auth.getPayload();
        return payload.role === 'admin';
      };

      /**
       * Currently active nav item when '/' index
       *
       * @param {string} path
       * @returns {boolean}
       */
      vm.indexIsActive = function(path) {
        // path should be '/'
        return $location.path() === path;
      };

      /**
       * Currently active nav item
       *
       * @param {string} path
       * @returns {boolean}
       */
      vm.navIsActive = function(path) {
        return $location.path().substr(0, path.length) === path;
      };
    }

    return directive;
  }
})();
