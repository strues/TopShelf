(function() {
  'use strict';

function HomeCarouselCtrl () {
    var vm = this;

    vm.myInterval = 2000;
    vm.slides = [
        {
            image: 'assets/images/hero.jpg'
        },
        {
            image: 'assets/images/banner1.jpg'
        }
    ];

}

angular
  .module('topshelf.core')
  .controller('HomeCarouselCtrl', HomeCarouselCtrl);
})();
