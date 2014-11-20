(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name guild.recruitment.controller:StreamCtrl
   *
   * @description
   *
   */


  function RosterCtrl($scope, $http, $interval, $q) {

    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [
    { name: '_id', enableCellEdit: false, width: '10%' },
    { name: 'name', displayName: 'Name', width: '20%' },
    { name: 'Class', displayName: 'Class' , width: '10%' },
    { name: 'Race', displayName: 'Race' , width: '10%' },
    { name: 'Spec', displayName: 'Spec' , width: '10%' },
    { name: 'Thumbnail', displayName: 'Thumbnail' , width: '10%' },
    { name: 'ilvl', displayName: 'iLvl' , width: '10%' },
    { name: 'Rank', displayName: 'Rank', width: '10%' }
  ];

 $scope.msg = {};

 $scope.gridOptions.onRegisterApi = function(gridApi){
          //set gridApi on scope
          $scope.gridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope,$scope.saveRow,function(rowEntity, colDef, newValue, oldValue){
            $scope.msg.lastCellEdited = 'edited row id:' + rowEntity._id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
            $scope.$apply();
          });
        };

$scope.saveRow = function( rowEntity ) {
    $http.put('/api/roster/' + rowEntity._id, rowEntity).success(function(){
      console.log('Saved!!');
    }).error(function() {
      console.log('Error');
    });
    };

  $http.get('/api/roster')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });

}
  angular
    .module('topshelf.guild')
    .controller('RosterCtrl', RosterCtrl);
})();
