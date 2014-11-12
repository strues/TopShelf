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

 function InfoCtrl($scope, wowApi, $window,$filter, ngTableParams) {

  wowApi.guild.members({ name: 'Top Shelf', realm: 'Sargeras' })
  .success(function (myData){
    var data = [myData];

$scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10         // count per page

    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


  });
}

})();

