(function () {
  'use strict';
  /**
   * @name ArticleDetailCtrl as hdetail
   * @desc
   * Handles the display of a single article
   * @memberOf app.guild
   */
  angular
      .module('app.guild')
      .controller('ArticleDetailCtrl', ArticleDetailCtrl);
  /* @ngInject */
  function ArticleDetailCtrl($scope, $stateParams, $http, $location) {
    var hdetail = this;
    var articleId = $stateParams.id;
    if (articleId && articleId.length > 0) {
      $http.get('/api/v1/articles/' + articleId).success(function (article) {
        $scope.article = article;
      });
    }
    $http.get('/api/v1/articles').success(function (data) {
      $scope.userData = data;
    });
  }
}());
