'use strict';

angular.module('app')

/* Define the Repository that interfaces with Restangular */
.factory('RosterRepository', function (Restangular, AbstractRepository) {

    function RosterRepository() {
      AbstractRepository.call(this, Restangular, 'rosters');
    }

    AbstractRepository.extend(RosterRepository);
    return new RosterRepository();

  }
);
