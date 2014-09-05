(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name layout.directive:menu
   * @restrict EA
   * @element
   * @function
   *
   * @description
   * Change the element's text to menu\nscope\nattrs
   *
   * @example
     <example module="layout">
       <file name="index.html">
        <menu></menu>
       </file>
     </example>
   *
   * @ngInject
   *
   */
  function menuToggle($rootScope, $cookieStore, $window) {
    return {
      restrict: 'E',
      scope: {},
      template: '<span class="menu_toggle" ng-click="toggleSidebar()"><span class="icon_menu_toggle" ><i class="arrow_carrot-2left" ng-class="sideNavCollapsed ? \'hide\' : \'\'"></i><i class="arrow_carrot-2right" ng-class="sideNavCollapsed ? \'\' : \'hide\'"></i></span></span>',
      replace: false,
     link: function (scope, el, attrs) {
                    var mobileView = 992;
                    $rootScope.getWidth = function () {
                        return window.innerWidth;
                    };
                    $rootScope.$watch($rootScope.getWidth, function (newValue, oldValue) {
                        if (newValue >= mobileView) {
                            if (angular.isDefined($cookieStore.get('sideNavCollapsed'))) {
                                if ($cookieStore.get('sideNavCollapsed') == false) {
                                    $rootScope.sideNavCollapsed = false;
                                }
                                else {
                                    $rootScope.sideNavCollapsed = true;
                                }
                            }
                            else {
                                $rootScope.sideNavCollapsed = false;
                            }
                        }
                        else {
                            $rootScope.sideNavCollapsed = true;
                        }
                    });
                    scope.toggleSidebar = function () {
                        $rootScope.sideNavCollapsed = !$rootScope.sideNavCollapsed;
                        $cookieStore.put('sideNavCollapsed', $rootScope.sideNavCollapsed);
                    };
                    window.onresize = function () {
                        $rootScope.$apply();
                    };
    }
  }
}
  angular
    .module('app')
    .directive('menuToggle', menuToggle);
})();