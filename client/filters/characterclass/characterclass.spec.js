'use strict';

describe('characterClass filter', function () {

	beforeEach(module('TopShelfGuild'));

	// initialize filter on each test
	var characterClass;
	beforeEach(inject(function ($filter) {
		characterClass = $filter('characterClass');
	}));

	it('should return the same', function () {
		var text = 'Here is a simple test';
		expect(characterClass(text)).toBe(text);
	});

});