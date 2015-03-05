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

    function HomeCarouselCtrl(Slide) {
        var carousel = this;

        carousel.slides = {};

        Slide.all().success(function(data) {
            // bind the posts that come back to vm.posts
            carousel.slides = data;
        }).error(function(error) {
            vm.status = 'Unable to Retrieve Posts: ' + error.message;
        });

        // carousel.slides = [{
        //     image: 'assets/images/mythic-oregorger.jpg'
        // }, {
        //     image: 'assets/images/mythic-beastlord.jpg'
        // }, {
        //     image: 'assets/images/blackhand-slider.jpg'

        // }, {
        //     image: 'assets/images/mythic-koragh.jpg'
        // }, {
        //     image: 'assets/images/mythic-butcher.jpg'
        // }];

    }

})();
