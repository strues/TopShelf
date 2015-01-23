(function () {
    'use strict';

    angular
        .module('topshelf.admin.states')
        .controller('ResourceCtrl', ResourceCtrl);
    /* @ngInject */
    function ResourceCtrl(Resource) {
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

        vm.deleteResource = function (id) {
        console.log('inside resource.controller.js deleteResource - id', id);
        Resource.delete(id);
    };
    }

})();
