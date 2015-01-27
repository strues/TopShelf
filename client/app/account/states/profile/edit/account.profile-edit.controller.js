(function() {
    'use strict';

    angular
        .module('topshelf.account.states')
        .controller('ProfileEditCtrl', ProfileEditCtrl);

    /* @ngInject */
    function ProfileEditCtrl(Auth, User, toastr) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProfileEditCtrl';
        vm.Auth = Auth;
        vm.errors = {};

        vm.changePassword = function() {
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
            .then(function() {
                toastr.success('Your password has been changed.', 'All Set!')
            })
            .catch(function() {
                vm.message = '';
            });
            }
        };

})();

/*
// get the user data for the user you want to edit
        // $routeParams is the way we grab data from the URL
        Post.get($stateParams.postId)
          .success(function(data) {
              vm.postData = data;
          });

        // function to save the user
        vm.savePost = function() {
            vm.processing = true;
            vm.message = '';

          // call the userService function to update
            Post.update($stateParams.postId, vm.postData)
            .success(function(data) {
                vm.processing = false;

              // clear the form
                vm.postData = {};

              // bind the message from our API to vm.message
                vm.message = data.message;
            });
        };
 */
