(function () {
    'use strict';
    angular.module('app.admin.states').controller('AdminCarouselCtrl', AdminCarouselCtrl);
    /* @ngInject */
    function AdminCarouselCtrl(Slide) {
        var vm = this;
        vm.processing = true;
        Slide.all().success(function (slideData) {
            // bind the posts that come back to vm.posts
            vm.slides = slideData;
        }).error(function (error) {
            vm.status = 'Unable to Retrieve Posts: ' + error.message;
        });
        vm.saveCarousel = function () {
            vm.processing = true;
            vm.message = '';
            Slide.create(vm.slideData).success(function (data) {
                toastr.success('Your slide was added to the database', 'Submitted!');
                vm.processing = false;
                vm.slideData = {};
                vm.message = data.message;
            }).error(function (error) {
                toastr.error('Unable to Create Post' + error.message, 'Error');
                $scope.status = 'Unable to Create Post: ' + error.message;
            });
        };
    }
}());