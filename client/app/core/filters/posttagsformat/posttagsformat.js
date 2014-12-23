'use strict';

angular.module('topshelf.core')
	.filter('postTagsFormat', function () {
		return function (input, delimiter) {
      // return 'postTagsFormat filter: ' + input;
      return (input || []).join(delimiter || ', ');
    };
	});
