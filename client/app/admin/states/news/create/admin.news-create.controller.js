(function () {
    'use strict';

    angular
        .module('topshelf.admin.states')
        .controller('NewsCreateCtrl', NewsCreateCtrl);

    /* @ngInject */
    function NewsCreateCtrl(Post, sweet, Auth) {
        var vm = this;
        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'create';

        vm.savePost = function () {
            vm.processing = true;
            vm.message = '';

            Post.create(vm.postData)
              .success(function(data) {
                  vm.processing = false;
                  vm.postData = {};
                  vm.message = data.message;
                  sweet.show('Amazing', 'You\'ve written a new post', 'success');
                  vm.status = 'Created Post! Refreshing Post List.';
              })
              .error(function (error) {
                sweet.show('Oops...', 'Something broke', 'error');
                vm.status = 'Unable to Create Post: ' + error.message;
                console.log('status:', vm.status);
            });
        }; // end of $scope.createPost
    }

})();
