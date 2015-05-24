(function () {
  'use strict';
  /*
   * @ngdoc Controller
   * @name ResourceEditCtrl
   */
  angular
    .module('app.admin')
    .controller('ResourceEditCtrl', ResourceEditCtrl);
  ResourceEditCtrl.$inject = ['Resource', '$scope', '$stateParams'];
  /* @ngInject */
  function ResourceEditCtrl(Resource, $scope, $stateParams) {
    /*jshint validthis: true */
    var vm = this;
    $scope.model = {};
    // variable to hide/show elements of the view
    // differentiates between news.create or profile.news.edit pages
    vm.type = 'edit';
    //vm.close = ResourceModal.deactivate;
    // get the user data for the user you want to profile.news.edit
    // $routeParams is the way we grab data from the URL
    Resource.get($stateParams.resourceId).success(function (data) {
      vm.resourceData = data;
    });
    // function to save the user
    vm.saveResource = function () {
      vm.processing = true;
      vm.message = '';
      // call the userService function to update
      Resource.update($stateParams.resourceId, vm.resourceData)
        .success(function (data) {
          vm.processing = false;
          // clear the form
          vm.resourceData = {};
         Materialize.toast('Your changes have been saved', 3000); //jshint ignore:line
          // bind the message from our API to vm.message
          vm.message = data.message;
        });
    };
  }
}());