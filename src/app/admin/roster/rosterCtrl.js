(function () {
'use strict';
  /**
  * Displays a list of all the applications
  * Provides delete functioonality
  * 
  * @param
  * @returns Angular:Controller
  */

  /* @ngInject */
  function RosterCtrl ($scope, $window, Restangular, RosterRepository, $timeout, $resource, ngTableParams) {
    
$scope.rosters = RosterRepository.getList();
      $scope.delete = function (data) {
        if(window.confirm('Are you sure?')) {
          RosterRepository.remove(data).then(function () {
              $scope.rosters = RosterRepository.getList();
            });
        }
      };
  
    
    
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
    }, {
        total: 0,           // length of data
        getData: function($defer, params) {
            // ajax request to api
            RosterRepository.getList(), function(data) {
                $timeout(function() {
                    // update table params
                    params.total(data.total);
                    // set new data
                    $defer.resolve(data.result);
                }, 500);
            };
        }
    })

  }

angular
  .module('app')
  .controller('RosterCtrl', RosterCtrl);
})();