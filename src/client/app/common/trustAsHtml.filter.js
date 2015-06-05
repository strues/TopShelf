(function() {
  'use strict';

  /**
   * @ngdoc filter
   * @name common.filter:trustAsHtml
   *
   * @description
   *
   * @param {String} input The string of text to filter
   * @returns {String} The trusted by SCE text
   *
   */
  angular
    .module('app.common')
    .filter('trustAsHtml', trustAsHtml);

  trustAsHtml.$inject = ['$sce'];

  function trustAsHtml($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }
}());
