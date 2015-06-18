(function() {

    angular
        .module('app.core')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['Auth', 'ngToast', '$location', 'User'];
    /* @ngInject */
    function NavbarCtrl(Auth, ngToast, $location, User) {
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
            ngToast.create('See you around');
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
