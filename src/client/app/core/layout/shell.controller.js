(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.core.ShellCtrl
   * @description
   * Controller
   */
  angular
    .module('app.core')
    .controller('MasterCtrl', MasterCtrl);

  MasterCtrl.$inject = ['$scope', '$auth'];
  /* @ngInject */
  function MasterCtrl($scope, $auth) {
    var master = this;

    master.auth = $auth;
    master.isCollapsed = true;

    var mobileView = 992;

    master.getWidth = function() {
      return window.innerWidth;
    };

    master.toggleSidebar = function() {
      master.toggle = !master.toggle;
    };

    window.onresize = function() {
      $scope.$apply();
    };

  }
})();
