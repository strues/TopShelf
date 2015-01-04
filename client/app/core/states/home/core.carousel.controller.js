(function() {
    'use strict';

    function HomeCarouselCtrl () {
        var carousel = this;

        carousel.myInterval = 3000;
        carousel.slides = [
            {
                image: 'assets/images/hero.jpg'
            },
            {
                image: 'assets/images/banner1.jpg'
            }
        ];

    }

    angular
        .module('topshelf.core.states')
        .controller('HomeCarouselCtrl', HomeCarouselCtrl);
})();
