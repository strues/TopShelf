(function () {
    'use strict';

    function RecruitmentFactory ($http) {
        console.log('recruitment.service.js');

        var urlBase = 'api/recruitments';
        var exports = {};

        exports.getStatus = function () {
            return $http.get(urlBase);
        };

        exports.getStatusById = function (recruitmentId) {
            return $http.get(urlBase + '/' + recruitmentId);
        };

        exports.createStatus = function (newRecruitment) {
            return $http.post(urlBase, newRecruitment);
        };

        exports.updateStatus = function (updatedRecruitment) {
            return $http.put(urlBase + '/' + updatedRecruitment._id, updatedRecruitment);
        };

        exports.removeStatus = function(recruitmentId) {
            return $http.delete(urlBase + '/' + recruitmentId);
        };
        return exports;

    }

    angular
        .module('topshelf.core')
        .factory('RecruitmentFactory', RecruitmentFactory);
})();
