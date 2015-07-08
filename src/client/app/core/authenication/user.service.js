// User API $http calls
(function() {

	angular
		.module('app.core')
		.service('User', User);

  User.$inject = ['$resource'];

	function User($resource) {
		return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
			update: {
				method: 'PUT',
				params: {
					id:'@_id'
				}
			}
	});
	}
})();
