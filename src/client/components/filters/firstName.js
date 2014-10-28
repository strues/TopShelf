angular.module('app')
	.filter('firstName', function() {
		return function(item) {
			if(!angular.isUndefined(item)) {
				return item.split(' ')[0];
			}
		};
	});