(function () {
    'use strict';
    /**
     * @name HomePostDetailsCtrl as carousel
     * @desc Carousel controller
     * @requires (mgcrea.ngStrap)
     * @memberOf topshelf.core.states
     */
    angular
        .module('app.core')
        .controller('HomePostDetailsCtrl', HomePostDetailsCtrl);
    function HomePostDetailsCtrl($scope, $stateParams, $http, $location) {
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
