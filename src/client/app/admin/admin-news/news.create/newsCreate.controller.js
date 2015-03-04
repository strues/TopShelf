(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name NewsCreateCtrl
     * @description Controller to news.create admin-news posting.
     */

    angular
        .module('app.admin.states')
        .controller('NewsCreateCtrl', NewsCreateCtrl);

    /* @ngInject */
    function NewsCreateCtrl(Post, toastr, Auth) {
        var vm = this;
        // variable to hide/show elements of the view
        // differentiates between news.create or profile.news.edit pages
        vm.type = 'create';

        vm.savePost = function() {
            vm.processing = true;
            vm.message = '';
            /*
 @TODO implement image upload
 */
            Post.create(vm.postData)
                .success(function(data) {
                    vm.processing = false;
                    vm.postData = {};
                    vm.message = data.message;
                    toastr.success('Your post should now appear on the main page', 'Post Made!');
                    vm.status = 'Created Post! Refreshing Post List.';
                })
                .error(function(error) {
                    toastr.error('There was a problem with your post' + error.message,
                        'Something broke');
                    vm.status = 'Unable to Create Post: ' + error.message;
                    console.log('status:', vm.status);
                });
        }; // end of $scope.createPost
    }

})();
