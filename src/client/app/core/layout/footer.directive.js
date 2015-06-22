(function () {
    /**
       * @ngdoc directive
       * @name app.core.directive:footer
       * @restrict EA
       * @element
       *
       * @description
       *
       * @example
       *
       */
angular
  .module('app.core')
  .directive('theFooter', theFooter);

    function theFooter() {
        return {
            restrict: 'EA',
            templateUrl: 'app/core/layout/footer.html',
            controller: 'FooterCtrl'
        };
    }

}());
