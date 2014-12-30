(function () {
    'use strict';

    angular
        .module('topshelf.admin')
        .controller('RecruitmentListCtrl', RecruitmentListCtrl);

    function RecruitmentListCtrl($http, recruitmentFactory, socket) {
        var vm = this;

        recruitmentFactory.getRecruitment().success(function(recruitments) {
            vm.recruitments = recruitments;

            socket.syncUpdates('recruitment', vm.recruitments);
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
