(function () {
  'use strict';
  angular
    .module('app.admin')
    .controller('NewsListCtrl', NewsListCtrl);

  NewsListCtrl.$inject = ['$http', 'Article'];
  /* @ngInject */
  function NewsListCtrl($http, Article) {
    var vm = this;
    vm.processing = true;
    Article.all().success(function (data) {
      vm.processing = false;
      // bind the articles that come back to vm.articles
      vm.articles = data;
      // display more articles
      vm.articlesLength = data.length;
      var view = 1;
      var articlesQty = 4;
    }).error(function (error) {
      vm.status = 'Unable to retrieve articles: ' + error.message;
    });
    // ng-show/ng-hide
    vm.showMode = false;
    vm.deleteArticle = function (id) {
      Article.destroy(id);
      $http.get('/api/v1/articles').success(function (articles) {
        vm.articles = articles;
      });
    };
  }
}());
