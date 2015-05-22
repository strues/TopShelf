(function () {
  'use strict';
  /**
     * @name CarouselCtrl as carousel
     * @desc Carousel controller
     * @memberOf app.guild
     */
  angular
    .module('app.guild')
    .controller('CarouselCtrl', CarouselCtrl);

  CarouselCtrl.$inject = ['Slide'];
  /* @ngInject */
  function CarouselCtrl(Slide) {
    var carousel = this;
    carousel.slides = {};
    Slide.all().success(function (data) {
      // bind the slides that come back to vm.data
      carousel.slides = data;
    }).error(function (error) {
      carousel.status = 'Unable to slides because ' + error.message;
    });
  }
}());
