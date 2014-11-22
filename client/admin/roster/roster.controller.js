(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name guild.recruitment.controller:StreamCtrl
   *
   * @description
   *
   */


  function RosterCtrl($scope, $http, socket, $log, wowApi) {

    $scope.gridOptions = {
      enableGridMenu: true,
      enableFiltering: true,
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
    columnDefs: [

    { name: 'name', displayName: 'Name', width: '10%' },
    { name: 'classType', displayName: 'Class' , width: '10%' },
    { name: 'classSpec', displayName: 'Spec' , width: '10%' },
    { name: 'ilvl', displayName: 'iLvl' , width: '5%'},
    { name: 'rank', displayName: 'Rank', width: '10%' }

  ]

};
/**
 * Get roster info from mongo
 */


/**
 * Get item level
 */
   $http.get('/api/roster').success(function(data) {
      $scope.gridOptions.data = data;
      $scope.data = data;
    });

  $scope.info = {};
  $scope.msg = {};
  $scope.gridOptions.multiSelect = true;

   $scope.toggleMultiSelect = function() {
      $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
    };

    $scope.toggleModifierKeysToMultiSelect = function() {
      $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
    };

    $scope.selectAll = function() {
      $scope.gridApi.selection.selectAllRows();
    };

    $scope.clearAll = function() {
      $scope.gridApi.selection.clearSelectedRows();
    };

 $scope.gridOptions.onRegisterApi = function(gridApi, roster){
  $scope.roster = roster;
    socket.syncUpdates('roster', $scope.roster);
          //set gridApi on scope
          $scope.gridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope,$scope.saveRow,function(rowEntity, colDef, newValue, oldValue){
            $scope.msg.lastCellEdited = 'edited row id:' + rowEntity._id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
            $scope.$apply();
          });

    gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        $log.log(msg);
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
      });
  };

$scope.saveRow = function( rowEntity ) {
    $http.put('/api/roster/' + rowEntity._id, rowEntity).success(function(){
      console.log('Saved!!');
    }).error(function() {
      console.log('Error');
    });
    };



 $scope.addMember = function() {
    $http.post('/api/roster')
    .success(function() {
      console.log('added');
      }
    );

    var n = $scope.gridOptions.data.length + 1;
    $scope.gridOptions.data.push({
                'id': null,
                'name': 'New ' + n,
                'class': 'Monkadin ' + n,
                'spec': 'Resto'+ n,
                'race': 'rekt'+ n,
                'ilvl':'0'+ n,
                'thumbnail' : 'temp'+ n,
                'rank': 'bad'+ n
              });
  };

$scope.removeMember = function( rowEntity ) {
    $http.delete('/api/roster/' + rowEntity._id, rowEntity).success(function(){
      console.log('Deleted!!');
    }).error(function() {
      console.log('Error');
    });
    };

}
  angular
    .module('topshelf.guild')
    .controller('RosterCtrl', RosterCtrl);
})();
