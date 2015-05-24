(function () {
  'use strict';
  angular
    .module('app.admin')
    .controller('CarouselCtrl', CarouselCtrl);

  CarouselCtrl.$inject = ['Slide'];
  /* @ngInject */
  function CarouselCtrl(Slide) {
    var vm = this;
    vm.processing = true;
    Slide.all().success(function (slideData) {
      // bind the slides that come back to vm.slides
      vm.slides = slideData;
    }).error(function (error) {
      vm.status = 'Unable to Retrieve Posts: ' + error.message;
    });
    vm.saveCarousel = function () {
      vm.processing = true;
      vm.message = '';
      Slide.create(vm.slideData).success(function (data) {
        Materialize.toast('Your slide was saved.',
          3000);
        vm.processing = false;
        vm.slideData = {};
        vm.message = data.message;
      }).error(function (error) {
        Materialize.toast('Unable to Create Post' + error.message, 3000);
      });
    };
    vm.deleteSlide = function (slideId) {
      vm.processing = true;
      Slide.destroy(slideId).success(function (data) {
        Slide.all().success(function (slideData) {
          vm.processing = false;
          vm.slides = slideData;
        });
      });
    };
  }
}());
