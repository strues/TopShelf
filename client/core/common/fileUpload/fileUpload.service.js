'use strict';

angular.module('topshelf.core')
    .service('fileUpload', function($http) {
        this.uploadFileToUrl = function(fileList, uploadUrl) {

            var fd = new FormData();

            for (var prop in fileList) {
                if (fileList[prop] instanceof File) {
                    fd.append('file', fileList[prop]);
                }
            }

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
                .success(function() {

                })
                .error(function() {});
        };
    });
