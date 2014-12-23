(function() {

'use strict';

   function MediaCtrl($scope, $http, ImageFactory, FileUploader) {
        $scope.images = {};
        $scope.current = {};
        $scope.selectedImages = {};
        $scope.showMediaLibrary = true;

        var uploader = $scope.uploader = new FileUploader({
            url: '/api/images'
        });

        ImageFactory.getAllImages()
            .success(function(images) {
                $scope.images = images;
            });

        uploader.onCompleteAll = function() {
            ImageFactory.getAllImages()
                .success(function(images) {
                    $scope.images = images;
                });
        };

        $scope.saveImagesToCurrent = function(postId, type) {
            var imageArray = [];

            for (var id in $scope.selectedImages) {
                if ($scope.selectedImages[id]) {
                    imageArray.push(id);
                }
            }

            ImageFactory.saveImagesToDb(type, postId, imageArray);
        };

        $scope.removeImage = function(imageId) {

            $http.delete('/api/images/' + imageId).success(function() {
                if (imageId in $scope.selectedImages) {
                    delete $scope.selectedImages[imageId];
                }
                $http.get('/api/images').success(function(images) {
                    $scope.images = images;
                });
            });
        };
    }
    function mediaManager() {
        return {
            templateUrl: 'app/core/media/mediaManager.tpl.html',
            restrict: 'EA',
            scope: {
                current: '='
            },
            controller: 'MediaCtrl'
        };
    }
    angular
        .module('topshelf.core')
        .controller('MediaCtrl', MediaCtrl)
        .directive('mediaManager', mediaManager);
})();
