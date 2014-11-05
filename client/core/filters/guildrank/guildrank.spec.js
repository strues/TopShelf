'use strict';

describe('guildRank filter', function () {

	beforeEach(module('TopShelfGuild'));

	// initialize filter on each test
	var guildRank;
	beforeEach(inject(function ($filter) {
		guildRank = $filter('guildRank');
	}));

	it('should return the same', function () {
		var text = 'Here is a simple test';
		expect(guildRank(text)).toBe(text);
	});

});