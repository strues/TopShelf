(function () {
  'use strict';
  angular
    .module('app.admin')
    .controller('NewsEditCtrl', NewsEditCtrl);

  NewsEditCtrl.$inject = ['Article', '$stateParams'];
  /* @ngInject */
  function NewsEditCtrl(Article, $stateParams) {
    /*jshint validthis: true */
    var vm = this;
    // variable to hide/show elements of the view
    // differentiates between news.create or profile.news.edit pages
    vm.type = 'profile.news.edit';
    // get the user data for the user you want to profile.news.edit
    // $routeParams is the way we grab data from the URL
    Article.get($stateParams.articleId).success(function (data) {
      vm.articleData = data;
    });
    // function to save the user
    vm.saveArticle = function () {
      vm.processing = true;
      vm.message = '';
      // call the userService function to update
      Article.update($stateParams.articleId, vm.articleData)
            .success(function (data) {
              vm.processing = false;
              // clear the form
              vm.articleData = {};
              // bind the message from our API to vm.message
              vm.message = data.message;
            });
    };
  }
}());
