(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name homeCarousel.controller:HomeCarouselCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function HomeCarouselCtrl() {
    var vm = this;
    vm.ctrlName = 'HomeCarouselCtrl';

     vm.switchInterval = 3000;
   vm.slides = [
    {
      image: 'https://s3.amazonaws.com/rekt/images/gary.png'
    },
    {
      image: 'https://s3.amazonaws.com/rekt/images/klaxxi-slide.png'
    },
    {
      image: 'https://s3.amazonaws.com/rekt/images/thok-slide.png'
    },
    {
      image: 'https://s3.amazonaws.com/rekt/images/garrosh-slide.png'
    }
  ];
  }

  angular
    .module('guildApp')
    .controller('HomeCarouselCtrl', HomeCarouselCtrl);

})();
