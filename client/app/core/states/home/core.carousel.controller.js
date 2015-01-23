(function() {
    'use strict';
  /**
   * @namespace HomeCarouselCtrl
   * @desc Carousel controller
   * @memberOf topshelf.core.states
   */

    angular
        .module('topshelf.core.states')
        .controller('HomeCarouselCtrl', HomeCarouselCtrl);

    function HomeCarouselCtrl () {
        var carousel = this;

        carousel.myInterval = 3000;
        carousel.slides = [
            {
                image: 'assets/images/butcher.png'
            },
            {
                image: 'assets/images/banner1.jpg'
            },
            {
                image: 'assets/images/mythicBrack.png'
            }
        ];

    }

})();
