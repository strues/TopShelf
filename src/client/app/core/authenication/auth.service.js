(function() {
  /**
   * @ngdoc service
   * @name app.core.Auth
   * @description < description placeholder >
   */

  angular
    .module('app.core')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', 'User', '$localStorage', '$q'];
  /* @ngInject */
  function Auth($http, User, $localStorage, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function(cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      },
      currentUser = {};

    if ($localStorage.token) {
      currentUser = User.get();
    }

    return {
      /**
       * @ngdoc function
       * @name login
       * @methodOf auth.service:Auth
       * @description
       * Authenticate user and save token
       *
       * @param {Object} user login info
       * @param {Function} [callback] A callback
       * @return {Promise} A promise
       */
      login: function(user, callback) {
        var deferred = $q.defer();
        $http.post('/auth/local', {
            email: user.email,
            password: user.password
          })
          .then(function(res) {
            $localStorage.token = res.data.token;
            currentUser = User.get();
            deferred.resolve(res.data);
            safeCb(callback)();
          }, function(err) {
            this.logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          }.bind(this));
        return deferred.promise;
      },
      /**
       * @ngdoc function
       * @name logout
       * @methodOf auth.service:Auth
       * @description
       * Delete access token and user info.
       * Redirect to login page by forcing a page reload.
       *
       */
      logout: function() {
        delete $localStorage.token;
        currentUser = {};
      },
      /**
       * @ngdoc function
       * @name createUser
       * @methodOf auth.service:Auth
       * @description
       * Create a new user
       *
       * @param {Object} user user info to use
       * @param {Function} [callback] A callback
       * @return {Promise} The promise of the User service
       */
      createUser: function(user, callback) {
        return User.save(user, function(data) {
          $localStorage.token = data.token;
          currentUser = User.get();
          return safeCb(callback)(null, user);
        }, function(err) {
          this.logout();
          return safeCb(callback)(err);
        }.bind(this)).$promise;
      },
      /**
       * @ngdoc method
       * @name changePassword
       * @methodOf auth.service:Auth
       * @description
       * Change password
       *
       * @param {String} oldPassword The old used password
       * @param {String} newPassword The new password to use
       * @param {Function} [callback] A callback
       * @return {Promise} The promise of the User service
       */
      changePassword: function(oldPassword, newPassword, callback) {
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return safeCb(callback)(null, user);
        }, function(err) {
          return safeCb(callback)(err);
        }).$promise;
      },
      /**
       * @ngdoc function
       * @name getCurrentUser
       * @methodOf auth.service:Auth
       * @description
       * Gets all available info on authenticated user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise :
          currentUser;
        return $q.when(value)
          .then(function(user) {
            safeCb(callback)(user);
            return user;
          }, function() {
            safeCb(callback)({});
            return {};
          });
      },
      /**
       * @ngdoc function
       * @name isLoggedIn
       * @methodOf auth.service:Auth
       * @description
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * @ngdoc function
       * @name isAdmin
       * @methodOf auth.service:Auth
       * @description
       * Check if a user is an admin
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function(callback) {
        if (arguments.length === 0) {
          return currentUser.role === 'admin';
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.role === 'admin';
            safeCb(callback)(is);
            return is;
          });
      },
      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function() {
        return $localStorage.token;
      },
      setSessionToken: function(sessionToken, callback) {
        var cb = callback || angular.noop;
        $localStorage.token = sessionToken;
        currentUser = User.get(cb);
      }
    };
  }
}());
