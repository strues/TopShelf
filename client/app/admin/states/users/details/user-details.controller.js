(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name admin.states.controller:AdminUserDetailsCtrl
     *
     * @description shows the users profile and allows the
     * information to be edited in an aside
     *
     */

    angular
        .module('app.admin.states')
        .controller('AdminUserDetailsCtrl', AdminUserDetailsCtrl);
/* @ngInject */
    function AdminUserDetailsCtrl($scope, $http, toastr, $aside, $stateParams, $location) {

        var userId = $stateParams.id;

        if (userId && userId.length > 0) {
            $http.get('/api/users/' + userId)
                .success(function(user) {
                    $scope.user = user;
                });
        }

        $scope.saveAUser = function() {
            if (userId && userId.length > 0) {
                $http.put('/api/users/' + userId,
                    $scope.user).success(function(user) {
                    toastr.success('Your changes have been saved');
                });
            } else {
                $http.post('/api/users', $scope.user)
                    .success(function(user) {
                        toastr.success('Your changes have been saved');
                    });
            }
        };

        $http.get('/api/users').success(function(users) {
            $scope.users = users;
        });

        var userDetailsEditAside = $aside({
            scope: $scope,
            template: 'app/admin/states/users/details/user-details-aside.tpl.html',
            show: false
        });
        userDetailsEditAside.$promise.then(function() {
            userDetailsEditAside.hide();
        });
    }

})();
