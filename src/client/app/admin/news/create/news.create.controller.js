(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('NewsCreateCtrl', NewsCreateCtrl);

  NewsCreateCtrl.$inject = ['articleSvc', 'ngToast'];

  function NewsCreateCtrl(articleSvc, ngToast) {

    var vm = this;
    vm.saveArticle = function() {
      vm.processing = true;
      vm.message = '';
      articleSvc.create(vm.articleData).success(function(data) {
        vm.processing = false;
        vm.articleData = {};
        vm.message = data.message;
       ngToast.create('Your post should now appear on the main page',
          'Article Saved!');

      }).error(function(error) {
        ngToast.create('There was a problem with your post' +
          error.message);
      });
    }; // end of $scope.createPost
  }

})();
