(function() {
	'use strict';

	angular
		.module('app.guild')
		.controller('NewsViewCtrl', NewsViewCtrl);

	NewsViewCtrl.$inject = ['articleSvc', '$stateParams'];

	function NewsViewCtrl(articleSvc, $stateParams) {

		/*jshint validthis: true */
		var vm = this;
		var articleId = $stateParams.id;
		if (articleId && articleId.length > 0) {

		articleSvc.get(articleId).success(function(article) {
			vm.article = article;
		});
		}

		vm.newComment = function() {

  	articleSvc.addComment(articleId, vm.commentData)
  		.success(function(article) {
  			vm.article.comments.push(vm.commentData);
  			vm.commentData = {};
  		});
		};
	}
})();
