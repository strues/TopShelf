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

  function InfoCtrl($scope, wowApi, $window, ngTableParams) {

 $scope.tableParams = new ngTableParams({
        page: 1,   // show first page
        count: 5,
    }, {

        total: 0,  // value less than count hide pagination
        getData: function($defer, params) {
                 wowApi.guild.members({ name: 'Top Shelf', realm: 'Sargeras' }).then(function (data){

            $scope.data = data;
            $scope.characters = $scope.data.data.members;
            $scope.character = $scope.characters.character;

            $defer.resolve(data.result);
        }, 500)
    }
  });

  }

})();

