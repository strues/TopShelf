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
  function RosterCtrl ($scope, $window) {
  $scope.swapData = function() {
    if ($scope.gridOpts.data === data1) {
      $scope.gridOpts.data = data2;
    }
    else {
      $scope.gridOpts.data = data1;
    }
  };
 
  $scope.addData = function() {
    var n = $scope.gridOpts.data.length + 1;
    $scope.gridOpts.data.push({
                "charName": "New " + n,
                "charClass": "Mage " + n,
                "charSpec": "abc",
                "charRole": "Tank"
              });
  };
 
  $scope.removeFirstRow = function() {
    //if($scope.gridOpts.data.length > 0){
       $scope.gridOpts.data.splice(0,1);
    //}
  };
 
  $scope.reset = function () {
    data1 = angular.copy(origdata1);
    data2 = angular.copy(origdata2);
 
    $scope.gridOpts.data = data1;
  }
 
  var data1 = [
    {
      "charName": "Soopie",
      "charClass": "Warrior",
      "charSpec": "Protection",
      "charRole": "Tank"
    },
    {
      "charName": "Absohooftion",
      "charClass": "Shaman",
      "charSpec": "Enhance",
      "charRole": "Melee"
    },
    {
      "charName": "Toxic",
      "charClass": "Priest",
      "charSpec": "Shadow",
      "charRole": "Ranged"
    },
    {
      "charName": "Cjk",
      "charClass": "Priest",
      "charSpec": "Discipline",
      "charRole": "Healer"
    }
  ];
 
  var origdata1 = angular.copy(data1);
 
  var data2 = [
    {
      "firstName": "Waters",
      "lastName": "Shepherd",
      "company": "Kongene",
      "employed": true
    },
    {
      "firstName": "Hopper",
      "lastName": "Zamora",
      "company": "Acium",
      "employed": true
    },
    {
      "firstName": "Marcy",
      "lastName": "Mclean",
      "company": "Zomboid",
      "employed": true
    },
    {
      "firstName": "Tania",
      "lastName": "Cruz",
      "company": "Marqet",
      "employed": true
    },
    {
      "firstName": "Kramer",
      "lastName": "Cline",
      "company": "Parleynet",
      "employed": false
    },
    {
      "firstName": "Bond",
      "lastName": "Pickett",
      "company": "Brainquil",
      "employed": false
    }
  ];
 
  var origdata2 = angular.copy(data2);
 
  $scope.gridOpts = {
    data: data1
  };
}

angular
  .module('app')
  .controller('RosterCtrl', RosterCtrl);
})();