(function () {
    'use strict';
    /**
     * @name PostDetailCtrl as carousel
     * @desc Carousel controller
     * @requires (mgcrea.ngStrap)
     * @memberOf topshelf.core.states
     */
    angular
        .module('app.guild')
        .controller('PostDetailCtrl', PostDetailCtrl);
    /* @ngInject */
    function PostDetailCtrl($scope, $stateParams, $http, $location) {
        var hdetail = this;
        var postId = $stateParams.id;
        if (postId && postId.length > 0) {
            $http.get('/api/posts/' + postId).success(function (post) {
                $scope.post = post;
            });
        }
        $http.get('/api/posts').success(function (data) {
            $scope.userData = data;
        });
    }
}());
