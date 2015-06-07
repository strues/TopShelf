(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('NewsListingCtrl', NewsListingCtrl);

  NewsListingCtrl.$inject = ['articleSvc', '$state', 'toastr', '$stateParams'];

  function NewsListingCtrl(articleSvc, $state, $stateParams, toastr) {

    /*jshint validthis: true */
    var vm = this;
    articleSvc.all().success(function(data) {
        vm.articles = data;
        vm.articlesLength = data.length;
      })
      .error(function(errMsg) {
        toastr.error(errMsg.message, 'Whoops');
      });

    vm.deleteArticle = function(id) {
      articleSvc.destroy(id).success(function() {
        toastr.success('Deleted that poorly written article for you', 'Done');
        $state.reload();
      });
    };

  }

})();
