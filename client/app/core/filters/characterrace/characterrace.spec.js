'use strict';

describe('characterRace filter', function () {

	beforeEach(module('TopShelfGuild'));

	// initialize filter on each test
	var characterRace;
	beforeEach(inject(function ($filter) {
		characterRace = $filter('characterRace');
	}));

	it('should return the same', function () {
		var text = 'Here is a simple test';
		expect(characterRace(text)).toBe(text);
	});

});