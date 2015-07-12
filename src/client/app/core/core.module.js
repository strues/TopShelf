(function () {

  /**
   * @ngdoc overview
   * @name app.core
   * @description
   * The `app.core` module
   *
   * @requires ui.router
   */
  angular
      .module('app.core', [
        'ngAnimate',
        'ngMessages',
        'ngResource',
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'ngStorage',
        'btford.socket-io',
        'toastr',
        'textAngular',
        'angularFileUpload',
        'youtube-embed'
      ]);
}());
