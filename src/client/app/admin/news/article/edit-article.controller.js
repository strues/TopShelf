(function() {

  angular
    .module('app.admin')
    .controller('EditArticleCtrl', EditArticleCtrl);

  EditArticleCtrl.$inject = ['articleSvc', '$stateParams', 'toastr'];

  function EditArticleCtrl(articleSvc, $stateParams, toastr)
  {

    /*jshint validthis: true */
    var vm = this;
    var articleId = $stateParams.id;

    articleSvc.get(articleId).success(function(data)
    {
      vm.articleData = data;
    });

    vm.saveArticle = function()
    {
      vm.processing = true;
      vm.message = '';
      // call the userService function to update
      articleSvc.update(articleId, vm.articleData)
        .success(function()
        {
          vm.processing = false;
          // clear the form
          vm.articleData = {};
          // bind the message from our API to vm.message
          toastr.success('Your post has been updated');
        });
    };

  }

})();
