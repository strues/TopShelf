(function() {
  'use strict';

/**
 * @ngdoc directive
 * @name app.core.directive:navbar
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

  angular
    .module('app.core')
    .directive('navbar', navbar);

  navbar.$inject = [];

  function navbar() {
    // Usage: ...
    var directive = {
      bindToController: true,
      controller: 'NavbarCtrl',
      controllerAs: 'nav',
      restrict: 'EA',
      templateUrl: 'app/core/layout/navbar.html',
    };
    return directive;
  }

})();
