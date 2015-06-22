(function() {
    angular
        .module('app.core')
        .directive('disableNgAnimate', disableNgAnimate);

        disableNgAnimate.$inject = ['$animate'];
        function disableNgAnimate($animate) { /* @ngInject */
            return {
                restrict: 'A',
                link: function(scope, element) {
                    $animate.enabled(false, element);
                }
            };
        }
})();
