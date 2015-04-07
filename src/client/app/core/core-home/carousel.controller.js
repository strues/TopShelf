(function () {
    'use strict';
    /**
       * @name HomeCarouselCtrl as carousel
       * @desc Carousel controller
       * @requires (mgcrea.ngStrap)
       * @memberOf topshelf.core.states
       */
    angular
      .module('app.core')
      .controller('HomeCarouselCtrl', HomeCarouselCtrl);

    function HomeCarouselCtrl(Slide) {
        var carousel = this;
        carousel.slides = {};
        Slide.all().success(function (data) {
            // bind the posts that come back to vm.posts
            carousel.slides = data;
        }).error(function (error) {
            carousel.status = 'Unable to slides because ' + error.message;
        });
    }
}());
