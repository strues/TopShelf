(function() {
  'use strict';
  /*
   * @ngdoc Controller
   * @name ResourceCtrl
   * @description Logic for displaying admin-resources in admin area
   */
  angular
    .module('app.admin')
    .controller('MediaController', MediaController);
  /* @ngInject */
  MediaController.$inject = ['$rootScope', 'FileUploader',
    '$state', '$scope', '$http'];

  function MediaController($rootScope, FileUploader, $state, $scope, $http) {
    $scope.files = {};
    $scope.current = {};
    $scope.selectedImages = {};
    $scope.showMediaLibrary = true;
    var uploader = $scope.uploader = new FileUploader({
      url: '/api/files'
    });
    // FILTERS
    $http.get('/api/files').success(function(files) {
      $scope.files = files;
    });
    $scope.uploader.filters.push({
      name: 'customFilter',
      fn: function() {
        return this.queue.length < 10;
      }
    });

    uploader.onCompleteAll = function() {
      $http.get('/api/files').success(function(files) {
        $scope.files = files;
      });
    };

    $scope.class = 'col-sm-3';

    $scope.changeSize = function(btnNum) {
      switch (btnNum) {
        case 1:
          $scope.class = 'col-sm-2';
          break;
        case 2:
          $scope.class = 'col-sm-3';
          break;
        case 3:
          $scope.class = 'col-sm-4';
          break;
      }
    };
  }
}());
