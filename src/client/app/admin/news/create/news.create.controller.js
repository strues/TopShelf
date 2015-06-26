(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('NewsCreateCtrl', NewsCreateCtrl);

  NewsCreateCtrl.$inject = ['articleSvc', 'toastr'];

  function NewsCreateCtrl(articleSvc, toastr) {

    var vm = this;
    vm.saveArticle = function() {
      vm.processing = true;
      vm.message = '';
      articleSvc.create(vm.articleData).success(function(data) {
        vm.processing = false;
        vm.articleData = {};
        vm.message = data.message;
       toastr.success('Your post should now appear on the main page',
          'Article Saved!');

      }).error(function(error) {
        toastr.error('There was a problem with your post' +
          error.message, 'Oops');
      });
    }; // end of $scope.createPost
  }

})();
