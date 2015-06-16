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
        'ui.router',
        'ngStorage',
        'btford.socket-io',
        'ui.bootstrap',
        'ngToast',
        'textAngular',
        'angularFileUpload',
        'youtube-embed'
      ]);
}());
