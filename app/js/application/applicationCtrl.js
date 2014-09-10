(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name application.controller:ApplicationCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function ApplicationCtrl($scope, $state, toastr, $location, $http, ApplicationRepository) {

    $scope.formData = {};



        $scope.classOptions = [
            {value: 'deathKnight', label: 'Death Knight'},
            {value: 'druid', label: 'Druid'},
            {value: 'mage', label: 'Mage'},
            {value: 'monk', label: 'Monk'},
            {value: 'paladin', label: 'Paladin'},
            {value: 'priest', label: 'Priest'},
            {value: 'rogue', label: 'Rogue'},
            {value: 'shaman', label: 'Shaman'},
            {value: 'warlock', label: 'Warlock'},
            {value: 'warrior', label: 'Warrior'}
        ];
        $scope.yesNo = [
            {value: 'yes', label: 'Yes'},
            {value: 'no', label: 'No'}
        ];

        $scope.onSubmit = function() {
        $http.post('/api/applications', $scope.formData);
        console.log('application submitted:', $scope.formData);
        toastr.success('Your application has been submitted successfully.');
        $location.path('/');

  };
}
  angular
    .module('app')
    .controller('ApplicationCtrl', ApplicationCtrl);

})();
