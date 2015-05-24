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

  ArticleDetailCtrl.$inject = ['Article', '$stateParams'];
  /* @ngInject */
  function ArticleDetailCtrl(Article, $stateParams) {
    var vm = this;
    var articleId = $stateParams.id;
    if (articleId && articleId.length > 0) {

      Article.get(articleId).success(function (article) {
        vm.article = article;
      });
    }
  }
}());
