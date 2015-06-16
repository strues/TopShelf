(function() {
    angular
        .module('app.admin')
        .controller('NewsListingCtrl', NewsListingCtrl);

    NewsListingCtrl.$inject = ['articleSvc', '$state', 'ngToast',
        '$stateParams'
    ];

    function NewsListingCtrl(articleSvc, $state, $stateParams, ngToast) {

        /*jshint validthis: true */
        var vm = this;
        articleSvc.all().success(function(data) {
                vm.articles = data;
                vm.articlesLength = data.length;
            })
            .error(function(errMsg) {
                ngToast.create(errMsg.message);
            });

        vm.deleteArticle = function(id) {
            articleSvc.destroy(id).success(function() {
                ngToast.create(
                    'Deleted that poorly written article for you'
                );
                $state.reload();
            });
        };

    }

})();
