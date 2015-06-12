(function() {

    angular
        .module('app.core')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['Auth', 'toastr', '$location', 'User'];
    /* @ngInject */
    function NavbarCtrl(Auth, toastr, $location, User) {
        var nav = this;
        nav.isCollapsed = true;

        nav.isAdmin = Auth.isAdmin;
        nav.currentUser = Auth.getCurrentUser;
        nav.isLoggedIn = Auth.isLoggedIn;
        nav.isAuthenticated = function() {
            return Auth.isLoggedIn();
        };
        nav.logout = function() {
            Auth.logout();
            toastr.info('See you around', 'Logged Out!');
            $location.path('/account/login');
        };

        nav.isActive = function(route) {
            if (route !== '/') {
                return -1 !== $location.path().indexOf(route);
            } else {
                return route === $location.path();
            }
        };
    }
})();
