(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name app.user.factory:Auth
     *
     * @description
     *
     */
    angular
        .module('app.account.services')
        .factory('Auth', Auth);

/*
 * TODO Require authorization and acesss control frontside to go with the backend.
 */

    function Auth($http, User, $localStorage, $q) {
        var currentUser = $localStorage.token ? User.get() : {};

        return {

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - account-login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function(user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/auth/local', {
                    email: user.email,
                    password: user.password,
                    rememberme: user.rememberme
                }).
                success(function(data) {
                    $localStorage.token = data.token;
                    currentUser = User.get();
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            /**
             * Delete access token and user info
             *
             */
            logout: function() {
                delete $localStorage.token;
                currentUser = {};
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function(user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function(data) {
                        $localStorage.token = data.token;
                        currentUser = User.get();
                        return cb(user);
                    },
                    function(err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
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
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function() {
                return currentUser;
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function() {
                return currentUser.hasOwnProperty('role');
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
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

})();