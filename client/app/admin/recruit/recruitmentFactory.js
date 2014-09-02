'use strict';

angular.module('app')

/* Define the Repository that interfaces with Restangular */
.factory('RecruitmentRepository', function (Restangular, AbstractRepository) {

    function RecruitmentRepository() {
      AbstractRepository.call(this, Restangular, 'recruits');
    }

    AbstractRepository.extend(RecruitmentRepository);
    return new RecruitmentRepository();

  }
);
