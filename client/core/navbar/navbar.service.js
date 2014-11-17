(function () {
  'use strict';


   function Navbar() {
    return {
      isCollapsed: false,
      menu: [{
        'title': 'Home',
        'state': 'main'
      }
      ]
    };
  }

angular
  .module('topshelf.core')
  .factory('Navbar', Navbar);
})();
