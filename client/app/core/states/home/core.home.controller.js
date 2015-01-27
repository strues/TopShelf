(function () {
    'use strict';

  /**
   * @ngdoc controller
   * @name HomeCtrl as vm
   * @propertyOf topshelf.core.states
   * @description Controller for the home page
   *
   */

    angular
      .module('topshelf.core.states')
      .controller('HomeCtrl', HomeCtrl);
    /* @ngInject */
    function HomeCtrl(Post, $location) {

        var vm = this;
        //home.posts = {};
        vm.processing = true;

        Post.all().success(function(data) {
        // when all the posts come back, remove the processing variable
            vm.processing = false;

         // bind the posts that come back to vm.posts
            vm.posts = data;
        }).error(function (error) {
            vm.status = 'Unable to Retrieve Posts: ' + error.message;
        });

        vm.viewMore = function(post) {
            $location.path('/view-post/' + post._id);
        };

    }
})();
