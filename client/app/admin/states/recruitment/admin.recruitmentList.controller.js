(function () {
    'use strict';

    angular
        .module('topshelf.admin')
        .controller('RecruitmentListCtrl', RecruitmentListCtrl);

    function RecruitmentListCtrl($http, Recruitment) {
        var vm = this;

        Recruitment.all().success(function(data) {
            vm.recruitments = data;
        });

        vm.deleteRecruitment = function(recruitment) {
            $http.delete('/api/recruitment/' + recruitment._id).success(function() {
            $http.get('/api/recruitment').success(function(recruitments) {
                vm.recruitments = recruitments;
            });
        });
        };
    }
})();
