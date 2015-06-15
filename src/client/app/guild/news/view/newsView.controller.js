(function() {
  'use strict';

  angular
    .module('app.guild')
    .controller('NewsViewCtrl', NewsViewCtrl);

  NewsViewCtrl.$inject = ['articleSvc', '$stateParams', 'Auth'];

  function NewsViewCtrl(articleSvc, $stateParams, Auth) {

    /*jshint validthis: true */
    var vm = this;
    var articleId = $stateParams.id;
    if (articleId && articleId.length > 0) {

      articleSvc.get(articleId).success(function(article) {
        vm.article = article;
      });
    }
    vm.removeComment = function() {
      articleSvc.removeComment(commentId).then(function() {
       console.log('done');
      });
    }
    vm.newCom = function() {
        articleSvc.addComment(articleId, vm.commentData)
       .success(function(article) {
    vm.article.comments.push(comment);
    vm.comment.user = Auth.getCurrentUser().username;
    vm.content = '';
     });
    }
  }
})();
