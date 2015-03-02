(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name admin.states.controller:AdminUserDetailsCtrl
     *
     * @description shows the admin-users account-profile and allows the
     * information to be edited in an aside
     *
     */

    angular
        .module('app.admin.states')
        .controller('AdminUserDetailsCtrl', AdminUserDetailsCtrl);
    /* @ngInject */
    function AdminUserDetailsCtrl($scope, $http, User, $aside, $stateParams, $filter) {
        var vm = this;
        var userId = $stateParams.id;
        if (userId && userId.length > 0) {
            $http.get('/api/users/' + userId)
                .success(function(user) {
                    $scope.user = user;
                });
        }

        $http.get('/api/users').success(function(data) {
            $scope.userData = data;
        });

        var userDetailsEditAside = $aside({
            scope: $scope,
            template: 'app/admin/admin-users/user.details/userDetails-aside.tpl.html',
            show: false
        });

        userDetailsEditAside.$promise.then(function() {
            userDetailsEditAside.hide();
        });

        $scope.roles = [{
            value: 'user',
            text: 'User'
        }, {
            value: 'admin',
            text: 'Admin'
        }];

        $scope.saveUser = function() {
            // $scope.user already updated!
            return $http.put('/api/users/' + userId, $scope.user).error(function(err) {
                if (err.field && err.msg) {
                    // err like {field: "name", msg: "Server-side error for this username!"}
                    $scope.editableForm.$setError(err.field, err.msg);
                } else {
                    // unknown error
                    $scope.editableForm.$setError('name', 'Unknown error!');
                }
            });
        };
    }

})();
