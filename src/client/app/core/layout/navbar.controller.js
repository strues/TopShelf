(function() {

    angular
        .module('app.core')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['Auth', '$location', 'toastr', 'User'];
    /* @ngInject */
    function NavbarCtrl(Auth, $location,  toastr, User) {
        var vm = this;

        vm.isCollapsed = true;

        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAuthenticated = function() {
            return Auth.isLoggedIn;
        };
        vm.logout = function() {
            Auth.logout();
            toastr.info('See ya later', 'Signed out');
            $location.path('/account/login');
        };

        vm.isActive = function(route) {
            if (route !== '/') {
                return $location.path().indexOf(route) !== -1;
            } else {
                return route === $location.path();
            }
        };
    }
})();
