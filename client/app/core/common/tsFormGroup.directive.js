
/**
 @ngdoc directive
 @name topshelf.directive:tsgFormGroup
 @element div
 @function

 @description
  Resize textarea automatically to the size of its text content.
  **Note:** ie<9 needs pollyfill for window.getComputedStyle

 @example
   <example module="topshelf.foo">
     <file name="index.html">
         <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
 */

(function () {

'use strict';

  function tsFormGroup () {
    return {
      template: '<div class=\"form-group\">\n  <label class=\"control-label col-sm-3 col-xs-3\">{{label}}</label>\n  <div class=\"controls col-sm-9 col-xs-9\" ng-transclude>\n  </div>\n</div>',
          restrict: 'E',
          replace: true,
          transclude: true,
          scope: {
            label: '@',
            hint: '@'
          },
          link: function(scope, element, attrs) {
            return element.find('input').addClass('form-control');
          }
    };
  }


angular
  .module('topshelf.core')
  .directive('tsFormGroup', tsFormGroup);

})();
