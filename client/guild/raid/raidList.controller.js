(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.recruitment.controller:ApplicationListCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.guild')
    .controller('RaidListCtrl', RaidListCtrl);

  function RaidListCtrl($scope, $http, $location, socket) {
   $http.get('/api/raids').success(function(raids) {
      $scope.raids = raids;
      socket.syncUpdates('raids', $scope.raids, function(event, raid, raids) {
        // This callback is fired after the comments array is updated by the socket listeners

        // sort the array every time its modified
        raids.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
    })
  })


    $scope.selectRaid = function(raid) {
        $location.path('/guild/raids/' + raid._id);
    }
    $scope.deleteRaid = function(raid) {
        $http.delete('/api/raids/' + raid._id).success(function() {
            $http.get('/api/raids').success(function(raids) {
              $scope.raids = raids;
            });
        });
    }


        $scope.getApplicationById = function(id) {
            var results = jQuery.grep($scope.raid, function( raid, i ) {
                return ( raid._id === id );
            });
            return results[0];
        }



    $scope.addNew = function() {
        $location.path('/admin/raids/view')
    }
  }

})();
