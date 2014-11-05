(function () {
  'use strict';

  angular
    .module('topshelf.admin')
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
