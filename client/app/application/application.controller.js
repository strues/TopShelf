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
  function ApplicationCtrl($scope, $state, $location, $http) {

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
        $scope.specOptions = [
            {value: 'affliction', label: 'Affliction'},
            {value: 'arcane', label: 'Arcane'},
            {value: 'arms', label:'Arms'},
            {value: 'assassination', label:'Assasination'},
            {value: 'balance', label: 'Balance'},
            {value: 'beastmaster', label:'Beast Mastery'},
            {value: 'blood', label:'Blood'},
            {value: 'brewmaster', label: 'Brewmaster'},
            {value: 'combat', label:'Combat'},
            {value: 'demonology', label:'Demonology'},
            {value: 'destruction', label:'Destruction'},
            {value: 'discipline', label:'Discipline'},
            {value: 'elemental', label:'Elemental'},
            {value: 'enhancement', label:'Enhancement'},
            {value: 'feral', label: 'Feral'},
            {value: 'fire', label:'Fire'},
            {value: 'frost', label: 'Frost'},
            {value: 'fury', label: 'Fury'},
            {value: 'guardian', label:'Guardian'},
            {value: 'holy', label:'Holy'},
            {value: 'marksman', label: 'Marksman'},
            {value: 'mistweaver', label:'Mistweaver'},
            {value: 'protection', label:'Protection'},
            {value: 'restoration', label:'Restoration'},
            {value: 'retribution', label:'Retribution'},
            {value: 'shadow', label:'Shadow'},
            {value: 'subtlety', label:'Subtlety'},
            {value: 'survival', label:'Survival'},
            {value: 'unholy', label:'Unholy'},
            {value:'windwalker', label:'Windwalker'}
        ];

        $scope.yesNo = [
            {value: 'yes', label: 'Yes'},
            {value: 'no', label: 'No'}
        ];

        $scope.onSubmit = function() {
        $http.post('/api/applications', $scope.formData);
        console.log('application submitted:', $scope.formData);
        //Notification.success('Your application has been submitted.');
        $location.path('/');

  };
}
  angular
    .module('guildApp')
    .controller('ApplicationCtrl', ApplicationCtrl);

})();
