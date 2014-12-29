(function() {
  'use strict';

function HomeCarouselCtrl () {
    var vm = this;

    vm.myInterval = 3000;
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
