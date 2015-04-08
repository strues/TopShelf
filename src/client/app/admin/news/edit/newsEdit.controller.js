(function () {
    'use strict';
    angular
      .module('app.admin')
      .controller('NewsEditController', NewsEditController);
    /* @ngInject */
    function NewsEditController(Post, $stateParams) {
        /*jshint validthis: true */
        var vm = this;
        // variable to hide/show elements of the view
        // differentiates between news.create or profile.news.edit pages
        vm.type = 'profile.news.edit';
        // get the user data for the user you want to profile.news.edit
        // $routeParams is the way we grab data from the URL
        Post.get($stateParams.postId).success(function (data) {
            vm.postData = data;
        });
        // function to save the user
        vm.savePost = function () {
            vm.processing = true;
            vm.message = '';
            // call the userService function to update
            Post.update($stateParams.postId, vm.postData)
            .success(function (data) {
                vm.processing = false;
                // clear the form
                vm.postData = {};
                // bind the message from our API to vm.message
                vm.message = data.message;
            });
        };
    }
}());
