'use strict';

angular.module('topshelf.core.filters')
	.filter('postTagsFormat', function () {
    return function (input, delimiter) {
      // return 'postTagsFormat filter: ' + input;
        return (input || []).join(delimiter || ', ');
    };
	});
