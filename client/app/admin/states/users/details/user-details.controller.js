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

        $http.get('/api/users').success(function(data) {
            $scope.userData = data;
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
