'use strict';

angular.module('app')
  .provider('Application', function() {
    this.$get = ['$resource', function($resource) {
      var Application = $resource('/api/applications/:_id', {}, {
        update: {
          method: 'PUT'
        }
      });

      return Application;
    }];
  });