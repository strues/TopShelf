(function() {
    'use strict';
    /*
     * @ngdoc Controller
     * @name ResourceCtrl
     * @description Logic for displaying admin-resources in admin area
     */
    angular
        .module('app.admin.states')
        .controller('MediaCtrl', MediaCtrl);
    /* @ngInject */
    function MediaCtrl($rootScope, $scope, $http, toastr, $location) {
        $scope.doUpload = function() {

            console.log('title', $scope.title);
            console.log('url', $scope.url);
            toastr.success('your image was saved.')
            //create form data object
            var fd = new FormData();
            fd.append('title', $scope.title);
            fd.append('file', $scope.url);
            //send the file / data to your server
            $http.post('/api/images', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function(data) {
                //do something on success
            }).error(function(err) {
                //do something on error
            })

        }

        $http.get('/api/images').success(function(data) {
            $scope.images = data;
        }).error(function(error) {
          console.log('error');
        });

    }
})();
