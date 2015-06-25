(function() {
	/**
	 * @ngdoc controller
	 * @name app.guild.controller:RaidCtrl
	 * @description < description placeholder >
	 */

	angular
		.module('app.guild')
		.controller('RaidCtrl', RaidCtrl);

	RaidCtrl.$inject = ['$http', 'ngToast'];
	/* @ngInject */
	function RaidCtrl($http, ngToast) {

		/*jshint validthis: true */
		var vm = this;
		vm.formData = {};
		vm.addRaid = function() {
			// funcation assignmen
			$http.post('/api/raids', vm.formData).success(function() {

				ngToast.create('Goodluck, you\'re going to need it',
					'Recruitment Updated');
			}).error(function(error) {
				ngToast.create('There was a problem with the server' +
					error.message, 'Something broke');
			});
		};
	}

})();
