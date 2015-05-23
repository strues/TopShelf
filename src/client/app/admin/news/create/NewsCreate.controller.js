(function() {
  'use strict';
  /**
   * @ngdoc controller
   * @name NewsCreateCtrl
   * @description Controller to news.create admin-news posting.
   */
  angular
      .module('app.admin')
      .controller('NewsCreateCtrl', NewsCreateCtrl);

  NewsCreateCtrl.$inject = ['Article'];
  /* @ngInject */
  function NewsCreateCtrl(Article) {
    var vm = this;
    vm.select = {
            choices: ["Draft", "Published", "Archived"]
        };

    vm.saveArticle = function() {

      Article.create(vm.articleData).success(function(data) {
        vm.articleData = {};
        Materialize.toast('Your article was submitted', 3000); //jshint ignore:line
      }).error(function(error) {
        Materialize.toast('There was a problem saving your article', 3000); //jshint ignore:line
      });
    };
  }
}());
