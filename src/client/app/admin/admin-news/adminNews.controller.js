(function() {
    'use strict';

    angular
        .module('app.admin.states')
        .controller('NewsListCtrl', NewsListCtrl);
    /* @ngInject */
    function NewsListCtrl($http, Post, Slide) {
        var vm = this;
        vm.processing = true;

        Post.all().success(function(data) {

            vm.processing = false;

            // bind the posts that come back to vm.posts
            vm.posts = data;

            // display more posts
            vm.postsLength = data.length;
            var view = 1;
            var postsQty = 4;

        }).error(function(error) {
            vm.status = 'Unable to Retrieve Posts: ' + error.message;
        });
        // ng-show/ng-hide
        vm.showMode = false;

        vm.deletePost = function(id) {
            console.log('inside posts.controller.js deletePost - id', id);
            Post.delete(id);
            $http.get('/api/posts').success(function(posts) {
                vm.posts = posts;
            });
        };
    }

})();
