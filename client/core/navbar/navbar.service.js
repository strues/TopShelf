(function () {
  'use strict';

angular
  .module('topshelf.core')
  .factory('Navbar', Navbar);

   function Navbar() {
    // Navbar model
    return {
      isCollapsed: false,
      menu: [{
        'title': 'Home',
        'state': 'main'
      }
      ]
    };
  };
})();
