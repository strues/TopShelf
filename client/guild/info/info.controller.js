(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name topshelf.guild.controller:InfoCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.guild')
    .controller('InfoCtrl', InfoCtrl);

  function InfoCtrl($scope, $http, wowApi, ngTableParams) {


 wowApi.guild.members({ name: 'Top Shelf', realm: 'Sargeras' }).then(function (data){
            $scope.data = {};
            $scope.data = data;
            $scope.members = data.data.level1;
            $scope.characters = data.data.level2;
            console.log(data.data);
           // $scope.character = $scope.character.character;



 //render a JSON file as deep as we like


$scope.tableParams = new ngTableParams({
page: 1,   // show first page
        count: 5,
       sorting: {
       name: 'asc'
       }  // count per page
    }, {

    total: data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData);
        }
    });

  });
}
})();

