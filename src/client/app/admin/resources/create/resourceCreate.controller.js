(function () {
  'use strict';
  /*
   * @ngdoc Controller
   * @name ResourceCreateCtrl
   */
  angular
    .module('app.admin')
    .controller('ResourceCreateCtrl', ResourceCreateCtrl);

  ResourceCreateCtrl.$inject = ['Resource'];
  /* @ngInject */
  function ResourceCreateCtrl(Resource) {
    var vm = this;
    vm.processing = true;
    vm.toggle = false;
    vm.saveResource = function () {
      vm.processing = true;
      vm.message = '';
      Resource.create(vm.resourceData).success(function (data) {
        Materialize.toast('Successfully submited', 2000);  //jshint ignore:line
        vm.processing = false;
        vm.resourceData = {};
        vm.message = data.message;
      }).error(function (error) {
        Materialize.toast('Unable to Create Post' + error.message, 3000);  //jshint ignore:line
      });
    };
  }
}());
