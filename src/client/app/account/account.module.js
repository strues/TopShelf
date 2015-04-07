/**
 * @ngdoc overview
 * @name app.account
 * @description
 * The `app.account` module
 *
 * @requires ui.router
 */
(function () {
    'use strict';
    // register the route config on the application
    angular.module('app.account', [
      'app.core',
      'app.guild',
      'app.admin'
    ]).config(config);
    function config($stateProvider) {
        $stateProvider.state('account', {
            abstract: true,
            url: '/account',
            template: '<ui-view />'
        }).state('account.login', {
            url: '/login',
            views: {
                'main@': {
                    templateUrl: 'app/account/login/login.tpl.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                }
            }
        }).state('account.logout', {
            url: '/logout?referrer',
            referrer: 'home',
            controller: function (Auth) {
                Auth.logout();
            }
        }).state('account.signup', {
            url: '/signup',
            views: {
                'main@': {
                    templateUrl: 'app/account/signup/signup.tpl.html',
                    controller: 'SignupController',
                    controllerAs: 'signup'
                }
            }
        }).state('account.profile', {
            url: '/profile',
            views: {
                'main@': {
                    templateUrl: 'app/account/profile/profile.tpl.html',
                    controller: 'ProfileController',
                    controllerAs: 'profile'
                }
            }
        }).state('account.profileEdit', {
            url: '/profile/edit',
            views: {
                'main@': {
                    templateUrl:
                    'app/account/profile/profile.edit/profileEdit.tpl.html',
                    controller: 'ProfileEditController',
                    controllerAs: 'editProf'
                }
            },
            authenticate: true
        });
    }
}());
