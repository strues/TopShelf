(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('NewsListingCtrl', NewsListingCtrl);

  NewsListingCtrl.$inject = ['articleSvc', 'toastr', '$stateParams'];

  function NewsListingCtrl(articleSvc, $stateParams, toastr) {

    /*jshint validthis: true */
    var vm = this;
    articleSvc.all().success(function(data) {
        vm.articles = data;
        vm.articlesLength = data.length;
      })
      .error(function(errMsg) {
        toastr.error(errMsg.message, 'Whoops');
      });

  }

})();
