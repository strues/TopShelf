(function() {
	/**
	 * @ngdoc controller
	 * @name app.guild.controller:RaidCtrl
	 * @description < description placeholder >
	 */

	angular
		.module('app.guild')
		.controller('RaidCtrl', RaidCtrl);

	RaidCtrl.$inject = ['$http', 'toastr'];
	/* @ngInject */
	function RaidCtrl($http, toastr) {

		/*jshint validthis: true */
		var vm = this;
		vm.formData = {};
		vm.addRaid = function() {
			// funcation assignmen
			$http.post('/api/raids', vm.formData).success(function() {
				toastr
				.success('Goodluck, you\'re going to need it', 'Recruitment Updated');
			}).error(function(error) {
				toastr.error('There was a problem with the server' +
					error.message, 'Something broke');
			});
		};

		$http.get('/api/raids').success(function(data) {
			vm.raids = data;
		});
	}

})();
