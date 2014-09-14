(function () {
'use strict';
  /**
  * Edits the application
  *
  * @param
  * @returns Angular:Controller
  */

  angular
  .module('app')
  .controller('RecruitAddCtrl', RecruitAddCtrl);

  /* @ngInject *//*jshint validthis: true */
  function RecruitAddCtrl ($scope, $stateParams, $location, RecruitmentRepository) {
    
    $scope.classImages = [
        {name:'Warrior', img:'https://d14ofg6i8akc0o.cloudfront.net/images/warrior.png'},
        {name:'Warlock', img:'https://d14ofg6i8akc0o.cloudfront.net/images/warlock.png'},
        {name:'Priest', img:'https://d14ofg6i8akc0o.cloudfront.net/images/priest.png'},
        {name:'Hunter', img:'https://d14ofg6i8akc0o.cloudfront.net/images/hunter.png'},
        {name:'Druid', img:'https://d14ofg6i8akc0o.cloudfront.net/images/druid.png'}
    ]

    $scope.save = function () {
        RecruitmentRepository.create($scope.recruit).then(function () {
          $location.path('/admin/recruits');
        });
      };
  
  }

})();