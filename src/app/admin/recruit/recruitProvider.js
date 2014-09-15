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
  function Recruit() {
    return {
      $get: function ($resource) {
        /*jshint validthis: true */
           var Recruit = $resource('/api/recruits/:_id', {}, {
        update: {
          method: 'PUT'
        }
      });

        return 'Recruit';
      }
    };
  }

  angular
    .module('app')
    .provider('Recruit', Recruit);

})();