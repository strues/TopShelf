(function() {
    'use strict';

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

    angular
        .module('topshelf.core.states')
        .controller('HomeCarouselCtrl', HomeCarouselCtrl);
})();
