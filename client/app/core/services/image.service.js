(function() {
'use strict';

  function ImageFactory ($http) {
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
        return $http.put('/api/' + type + '/addImages/' + id, imageArray);
    };

    return exports;

  }
  angular
    .module('topshelf.core')
    .factory('ImageFactory', ImageFactory);
})();
