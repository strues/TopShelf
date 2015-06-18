(function() {
	/**
	 * @ngdoc service
	 * @name app.account.accountSvc
	 * @description < description placeholder >
	 */

	angular
		.module('app.account')
		.factory('accountSvc', accountSvc);

	/**
	 * GET promise response function
	 * Checks typeof data returned and succeeds if JS object, throws error if not
	 *
	 * @param response {*} data from $http
	 * @returns {*} object, array
	 * @private
	 */
	function _getRes(response) {
		if (typeof response.data === 'object') {
			return response.data;
		}
		else {
			throw new Error('retrieved data is not typeof object.');
		}
	}

	accountSvc.$inject = ['$http'];
	/* @ngInject */
	function accountSvc($http) {

		var service = {
			getAccount: getAccount,
			updateAccount: updateAccount
		};

		return service;

		////////////////////////////

		function getAccount() {
			return $http.get('/api/users/me').then(_getRes);

		}
		function updateAccount(profileData) {
			return $http.put('/api/users/me', profileData);
		}

	}

})();
