'use strict';

angular.module('topshelf.core')
    .factory('ImageFactory', function($http) {
        var exports = {};

        exports.getAllImages = function(){
          return $http.get('/api/images');
        };

        exports.getImagesFromIdArray = function(imageIdArray) {
            return $http.post('/api/images/imageArray', {
                'images': imageIdArray
            });
        };

        exports.saveImagesToDb = function(type, id, imageArray){
            return $http.put('/api/' + posts + '/addImages/' + id, imageArray);
        };

        return exports;
    });
