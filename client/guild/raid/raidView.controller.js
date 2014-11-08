(function () {
  'use strict';
  angular
    .module('topshelf.guild')
    .controller('RaidViewCtrl', RaidViewCtrl);

    function RaidViewCtrl($scope, $http, $stateParams, Auth, raidsFactory) {
      var raidId = $stateParams.id;

      if(raidId && raidId.length > 0) {
              $http.get('/api/raids/' + raidId).success(function(raid) {
                $scope.raid = raid;
              });
          }
   // var vm = this;
    this.data = {};
    var self = this;

$scope.confirmed = Auth.currentUser;

this.submit = function() {
        self.submitting = true;

        $http.put('/api/raids/' + raidId, self.data).then(function() {
          self.data = data

          console.log('form submitted:', self.data);

        }, function(response) {
          self.submitting = false;
        });
      };


      }

})();
