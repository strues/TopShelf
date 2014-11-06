/*
 * @TODO
 * Bottom portion of the composer page is brokenish
 */

(function () {
  'use strict';

  angular
    .module('topshelf.admin')
    .controller('AddRaidCtrl', AddRaidCtrl);

    function AddRaidCtrl($scope, raidsFactory, socket, Auth) {
        // get all posts which will display below editor area
    raidsFactory.getRaids()
    .success(function (raids) {

      $scope.raids = raids;
      socket.syncUpdates('raid', $scope.raids);

      // display more posts
      $scope.raidsLength = raids.length;
      var view = 1;
      var raidsQty = 4;
      $scope.raidsShownPerView = function() {
        return view * raidsQty;
      };
      $scope.getAdditionalRaids = function() {
        return view < ($scope.raidsLength / raidsQty);
      };
      $scope.showMoreRaids = function() {
        view = view + 1;
      };
    }).
    error(function (error) {
      $scope.status = 'Unable to Retrieve Raids: ' + error.message;
      // console.log($scope.status);
    });

    // ng-show/ng-hide
    $scope.showMode = false;

    // when Save is clicked
    $scope.createRaid = function () {

      var raid = {
        date: $scope.newRaid.date,
        time: $scope.newRaid.time,
        title: $scope.newRaid.title,
        zone: $scope.newRaid.zone,
        difficulty: $scope.newRaid.difficulty,
        description:  $scope.newRaid.description
      }

      // data to postsFactory service
      raidsFactory.createRaid(raid)
        .success(function () {
          $scope.status = 'Created Raid! Refreshing Raid List.';
          //console.log('$scope.status', $scope.status);
          // $scope.posts.push(post);
        }).
        error(function (error) {
          $scope.status = 'Unable to Create Raid: ' + error.message;
          //console.log('$scope.status', $scope.status);
        });

      // reset inputs
      $scope.newRaid.date = '';
      $scope.newRaid.time = '';
      $scope.newRaid.title = '';
      $scope.newRaid.zone = '';
      $scope.newRaid.difficulty = '';
      $scope.newRaid.description = '';


    }; // end of $scope.createPost

    // when x is clicked
    $scope.deleteRaid = function (raidID) {
      console.log('inside raids.controller.js deleteRaid - raidID', raidID);
      raidsFactory.deleteRaid(raidID);
    };
    }
})();
