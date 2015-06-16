(function() {

    angular
        .module('app.core')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['Auth', 'ngToast', '$location', 'User'];
    /* @ngInject */
    function NavbarCtrl(Auth, ngToast, $location, User) {
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
            ngToast.create('See you around');
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
