(function () {
    'use strict';

    angular
        .module('topshelf.admin.states')
        .controller('RecruitmentSitesCtrl', RecruitmentSitesCtrl);

    function RecruitmentSitesCtrl($http, recruitmentFactory, $state) {
        var recruitmentSites = this;

        recruitmentFactory.getRecruitment().success(function(recruitments) {
                recruitmentSites.recruitments = recruitments;
            });

        recruitmentSites.recruitmentSiteData = {};

        recruitmentSites.onSubmit = function() {
            $http.post('/api/recruitment', recruitmentSites.recruitmentSiteData);
            console.log('recruitment status submitted:', recruitmentSites.recruitmentSiteData);
            $state.reload();
        };
        recruitmentSites.deleteRecruitment = function(recruitment) {
            $http.delete('/api/recruitment/' + recruitment._id).success(function() {
            $http.get('/api/recruitment').success(function(recruitments) {
                recruitmentSites.recruitments = recruitments;
            });
        });
        };
    }
})();
