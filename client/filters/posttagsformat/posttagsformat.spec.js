'use strict';

describe('postTagsFormat filter', function () {

	beforeEach(module('app'));

	// initialize filter on each test
	var postTagsFormat;
	beforeEach(inject(function ($filter) {
		postTagsFormat = $filter('postTagsFormat');
	}));

	it('should return the same', function () {
		var text = 'Here is a simple test';
		expect(postTagsFormat(text)).toBe(text);
	});

});