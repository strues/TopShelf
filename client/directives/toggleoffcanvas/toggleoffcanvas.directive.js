(function () {
  'use strict';

  angular
    .module('app')
    .directive('toggleOffCanvas', toggleOffCanvas);

    function toggleOffCanvas() {
      return {
          restrict: 'A',
          link: function(scope, ele, attrs) {
            return ele.on('click', function() {
              return $('#app').toggleClass('on-canvas');
            });
          }
        };
    };

})();
