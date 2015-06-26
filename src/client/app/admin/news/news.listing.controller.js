(function() {
    angular
        .module('app.admin')
        .controller('NewsListingCtrl', NewsListingCtrl);

    NewsListingCtrl.$inject = ['articleSvc', '$state', 'toastr',
        '$stateParams'
    ];

    function NewsListingCtrl(articleSvc, $state, $stateParams, toastr) {

        /*jshint validthis: true */
        var vm = this;
        articleSvc.all().success(function(data) {
                vm.articles = data.results;
                vm.articlesLength = data.length;
            })
            .error(function(errMsg) {
                toastr.create(errMsg.message);
            });

        vm.deleteArticle = function(id) {
            articleSvc.destroy(id).success(function() {
                toastr.create(
                    'Deleted that poorly written article for you'
                );
                $state.reload();
            });
        };

    }

})();
