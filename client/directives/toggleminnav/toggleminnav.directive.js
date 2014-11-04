(function () {
'use strict';

angular
  .module('app')
  .directive('toggleMinNav',toggleMinNav);

  function toggleMinNav ($rootScope) {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var $content, $nav, $window, Timer, app, updateClass;
          app = $('#app');
          $window = $(window);
          $nav = $('#nav-container');
          $content = $('#content');
          ele.on('click', function(e) {
            if (app.hasClass('nav-min')) {
              app.removeClass('nav-min');
            } else {
              app.addClass('nav-min');
              $rootScope.$broadcast('minNav:enabled');
            }
            return e.preventDefault();
          });
          Timer = void 0;
          updateClass = function() {
            var width;
            width = $window.width();
            if (width < 768) {
              return app.removeClass('nav-min');
            }
          };
          return $window.resize(function() {
            var t;
            clearTimeout(t);
            return t = setTimeout(updateClass, 300);
          });
        }
      };
    };

})();
