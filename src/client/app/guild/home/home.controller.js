(function() {
  'use strict';

  angular
    .module('app.guild')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['articleSvc', '$state'];

  function HomeCtrl(articleSvc, $state) {

    /*jshint validthis: true */
    var vm = this;
    vm.articles = {};
    articleSvc.all().success(function(data) {
      // bind the articles that come back to vm.articles
      vm.articles = data;
    });

    vm.selectSlide = function(i) {
      vm.selected = i;
    };

    vm.readArticle = function() {
      $state.go('home.article');
    }
    vm.class = 'col-sm-6 col-md-4';

    vm.changeSize = function(btnNum) {
      switch (btnNum) {
        case 1:
          vm.class = 'col-sm-6 col-md-4';
          break;
        case 2:
          vm.class = 'col-sm-6 col-md-6';
          break;
        case 3:
          vm.class = 'col-sm-12 col-md-12';
          break;
      }
    };
  }

})();
