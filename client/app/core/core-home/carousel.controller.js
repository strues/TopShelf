(function() {
    'use strict';
    /**
     * @name HomeCarouselCtrl as carousel
     * @desc Carousel controller
     * @requires (mgcrea.ngStrap)
     * @memberOf topshelf.core.states
     */

    angular
        .module('app.core.states')
        .controller('HomeCarouselCtrl', HomeCarouselCtrl);

    function HomeCarouselCtrl() {
        var carousel = this;

        carousel.slides = [{
            image: 'assets/images/mythic-beastlord.jpg'
        }, {
            image: 'assets/images/blackhand-slider.jpg'

        }, {
            image: 'assets/images/mythic-koragh.jpg'
        }, {
            image: 'assets/images/mythic-butcher.jpg'
        }];

    }

})();
