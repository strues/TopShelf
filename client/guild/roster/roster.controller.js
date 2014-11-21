(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name guild.recruitment.controller:StreamCtrl
   *
   * @description
   *
   */


  function RosterCtrl($scope, $http) {

    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [
    { name: '_id', enableCellEdit: false, width: '10%' },
    { name: 'name', displayName: 'Name', width: '20%' },
    { name: 'class', displayName: 'Class' , width: '10%' },
    { name: 'race', displayName: 'Race' , width: '10%' },
    { name: 'spec', displayName: 'Spec' , width: '10%' },
    { name: 'thumbnail', displayName: 'Thumbnail' , width: '10%' },
    { name: 'ilvl', displayName: 'iLvl' , width: '10%' },
    { name: 'rank', displayName: 'Rank', width: '10%' }
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

}
  angular
    .module('topshelf.guild')
    .controller('RosterCtrl', RosterCtrl);
})();
