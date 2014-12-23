(function( angular  ) {
'use strict';

  /* @ngdoc object
   * @name appStart
   * @requires app
   *
   * @description
   * The application startup function, called in the app module's run block
   * Created apart from app.js so it can be easily stubbed out
   * during testing or tested independently
   */

  function factory ($rootScope, util){
    var config = util.config;
    var logger = util.logger;

    var appStart = {
      start: start
    };

    return appStart;
    //////////////
    function start ( ) {
      logger.info( 'Top Shelf Guild is loaded and running on ' + util.config.server );

      // Trigger initial loading of data from server
      // The app may appear to be more responsive if loading happens in background
      // while the app launches on a splash page that doesn't actually need data.
    }


  }
  angular
    .module('topshelf').factory('appStart', ['$rootScope', 'util', factory]);
})( this.angular );
