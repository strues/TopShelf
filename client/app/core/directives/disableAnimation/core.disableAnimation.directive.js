(function () {
    'use strict';

    function disableAnimation($animate) {
        return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $attrs.$observe('disableAnimation', function(value) {
                $animate.enabled(!value, $element);
            });
        }
      };
    }

    angular
        .module('topshelf.core.directives')
        .directive('disableAnimation', disableAnimation);
})();
