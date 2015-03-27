(function () {
    'use strict';
    /* @ngdoc object
     * @name topshelf.account
     * @requires $stateProvider
     *
     * @description
     *
     */
    function config($stateProvider) {
        $stateProvider.state('account', {
            abstract: true,
            url: '/account',
            template: '<ui-view />'
        })
        .state('account.login', {
            url: '/login',
            views: {
                'main@': {
                    templateUrl: 'app/account/account-login/login.tpl.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('account.loginWithToken', {
            url: '/login/:sessionToken',
            template: ' ',
            controller: function ($stateParams, Auth, $location) {
                if ($stateParams.sessionToken) {
                    Auth.setSessionToken($stateParams.sessionToken, function () {
                        $location.path('/');
                    });
                }
            }
        })
        .state('account.logout', {
            url: '/logout?referrer',
            referrer: 'home',
            controller: function (Auth) {
                Auth.logout();
            }
        })
        .state('account.signup', {
            url: '/signup',
            views: {
                'main@': {
                    templateUrl: 'app/account/account-signup/signup.tpl.html',
                    controller: 'SignupCtrl'
                }
            }
        })
        .state('account.profile', {
            url: '/profile',
            views: {
                'main@': {
                    templateUrl: 'app/account/account-profile/profile.tpl.html',
                    controller: 'ProfileCtrl'
                }
            }
        })
        .state('account.profileEdit', {
            url: '/profile/edit',
            views: {
                'main@': {
                    templateUrl: 'app/account/account-profile/profile.edit/profileEdit.tpl.html',
                    controller: 'ProfileEditCtrl',
                    controllerAs: 'vm',
                }
            },
            authenticate: true
        });
    }
    angular.module('app.account.states').config(config);
}());
