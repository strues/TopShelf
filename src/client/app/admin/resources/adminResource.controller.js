(function () {
    'use strict';
    /*
       * @ngdoc Controller
       * @name ResourceCtrl
       * @description Logic for displaying admin-resources in admin area
       */
    angular
      .module('app.admin')
      .controller('ResourceController', ResourceController);
    /* @ngInject */
    function ResourceController(Resource) {
        var vm = this;
        vm.processing = true;
        Resource.all().success(function (data) {
            vm.processing = false;
            // bind the posts that come back to vm.posts
            vm.resources = data;
        }).error(function (error) {
            vm.status = 'Unable to Retrieve Resources: ' + error.message;
        });
        // ng-show/ng-hide
        vm.showMode = false;
        // function to delete a user
        vm.deleteResource = function (id) {
            vm.processing = true;
            Resource.delete(id).success(function (data) {
                // get all admin-users to update the table
                // you can also set up your api to return the list
                // of admin-users with the delete call
                Resource.all().success(function (data) {
                    vm.processing = false;
                    vm.resource = data;
                });
            });
        };
    }
}());
