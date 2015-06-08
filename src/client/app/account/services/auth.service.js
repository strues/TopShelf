(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.account.Auth
   * @description < description placeholder >
   */

  angular
    .module('app.account')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', 'User', '$localStorage', '$q'];
  /* @ngInject */
  function Auth($http, User, $localStorage, $q) {
    var currentUser = $localStorage.token ? User.get() : {};
    //var currentUser = {};
    // if ($localStorage.get('token')) {
    //     currentUser = User.get();
    // }
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
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/auth/local', {
          email: user.email,
          password: user.password,
          rememberme: user.rememberme
        }).success(function(data) {
          $localStorage.token = data.token;
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
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
        var cb = callback || angular.noop;
        return User.save(user, function(data) {
          $localStorage.token = data.token;
          currentUser = User.get();
          return cb(user);
        }, function(err) {
          this.logout();
          return cb(err);
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
        var cb = callback || angular.noop;
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      /**
       * @ngdoc function
       * @name getCurrentUser
       * @methodOf auth.service:Auth
       * @description
       * Gets all available info on authenticated user
       *
       * @returns {Object} User
       */
      getCurrentUser: function() {
        return currentUser;
      },
      /**
       * @ngdoc function
       * @name isLoggedIn
       * @methodOf auth.service:Auth
       * @description
       * Check if a user is logged in
       *
       * @returns {Boolean} True if user is logged in
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },
      /**
       * @ngdoc function
       * @name isLoggedInAsync
       * @methodOf auth.service:Auth
       * @description
       * Waits for currentUser to resolve before
       * checking if user is logged in
       *
       * @param {Function} cb A Callback
       */
      isLoggedInAsync: function(cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        }
        else if (currentUser.hasOwnProperty('role')) {
          cb(true);
        }
        else {
          cb(false);
        }
      },
      /**
       * @ngdoc function
       * @name isAdmin
       * @methodOf auth.service:Auth
       * @description
       * Check if a user is an admin
       *
       * @param {Object} [user] - The user to check for
       * the role. If no user is provided,
       * the current user will be used
       * to check for the role.
       * @return {Boolean} True if user is admin
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },
      /**
       * Get auth token
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
