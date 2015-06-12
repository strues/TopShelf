(function() {
  'use strict';

/**
 * @ngdoc directive
 * @name app.core.directive:navbar
 * @scope true
 * @param {object} navbar
 * @restrict EA
 *
 * @description
 * Directive and controller for the navigation
 *
 */

  angular
    .module('app.core')
    .directive('navbar', navbar);

  navbar.$inject = [];

  function navbar() {
    // Usage: ...
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/core/layout/navbar.html',
      controller: 'NavbarCtrl',
      controllerAs: 'nav'
    };
    return directive;
  }
})();
