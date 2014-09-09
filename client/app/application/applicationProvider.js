(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name application.provider:Application
   * @function
   *
   * @description
   *
   * @ngInject 
   *
   */
  function Application() {
    return {
      $get: function ($resource) {
           var Application = $resource('/api/applications/:_id', {}, {
        update: {
          method: 'PUT'
        }
      });

        return 'Application';
      }
    };
  }

  angular
    .module('app')
    .provider('Application', Application);

})();