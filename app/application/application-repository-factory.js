'use strict';

angular.module('app')

/* Define the Repository that interfaces with Restangular */
.factory('ApplicationRepository', function (Restangular, AbstractRepository) {

    function ApplicationRepository() {
      AbstractRepository.call(this, Restangular, 'applications');
    }

    AbstractRepository.extend(ApplicationRepository);
    return new ApplicationRepository();
  }
);