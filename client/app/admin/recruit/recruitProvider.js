'use strict';

angular.module('app')
  .provider('Recruit', function() {
    this.$get = ['$resource', function($resource) {
      var Recruit = $resource('/api/recruits/:_id', {}, {
        update: {
          method: 'PUT'
        }
      });

      return Recruit;
    }];
  });