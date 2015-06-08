(function() {
  'use strict';

  angular
    .module('app.guild')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['articleSvc'];

  function HomeCtrl(articleSvc) {

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

    vm.class = 'col-sm-3 col-md-3';

    vm.changeSize = function(btnNum) {
      switch (btnNum) {
        case 1:
          vm.class = 'col-sm-3 col-md-3';
          break;
        case 2:
          vm.class = 'col-sm-6 col-md-4';
          break;
        case 3:
          vm.class = 'col-sm-12 col-md-8 col-md-offset-1';
          break;
      }
    };
  }

})();
