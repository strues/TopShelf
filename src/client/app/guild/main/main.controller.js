(function () {
    'use strict';
    /*
      @ngdoc object
      @name app.guild.controller:MainCtrl:
    */
    angular
      .module('app.guild')
      .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['Post', '$scope', '$location'];
    /* @ngInject */
    function MainCtrl(Post, $scope, $location) {
        var vm = this;
        vm.posts = {};
        Post.all().success(function (data) {
            // bind the posts that come back to vm.posts
            vm.posts = data;
        }).error(function (error) {
            vm.status = 'Unable to Retrieve Postas: ' + error.message;
        });
        vm.viewMore = function (post) {
            $location.path('/post/' + post._id);
        };
    }
}());
