'use strict';

angular.module('app')
	.filter('postTagsFormat', function () {
		return function (input, delimiter) {
      // return 'postTagsFormat filter: ' + input;
      return (input || []).join(delimiter || ', ');
    };
	});
