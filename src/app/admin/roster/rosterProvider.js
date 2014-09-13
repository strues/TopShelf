'use strict';

angular.module('app')
  .provider('Roster', function() {
    this.$get = ['$resource', function($resource) {
      var Roster = $resource('/api/rosters/:_id', {}, {
        update: {
          method: 'PUT'
        }
      });

      return Roster;
    }];
  });