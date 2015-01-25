(function () {
    'use strict';

  /**
   * @ngdoc object
   * @label admin.recruitment.controller:RecruitmentCtrl
   *
   * @description
   *
   */

    function RecruitmentCtrl ($scope, $http, $state, $timeout, FormForConfiguration, toastr) {
        FormForConfiguration.enableAutoLabels();

        $scope.formData = {};
        $scope.classType = [
          {value: 'DeathKnight', label: 'Death Knight'},
          {value: 'Druid', label: 'Druid'},
          {value: 'Hunter', label: 'Hunter'},
          {value: 'Mage', label: 'Mage'},
          {value: 'Monk', label: 'Monk'},
          {value: 'Paladin', label: 'Paladin'},
          {value: 'Priest', label: 'Priest'},
          {value: 'Rogue', label: 'Rogue'},
          {value: 'Shaman', label: 'Shaman'},
          {value: 'Warlock', label: 'Warlock'},
          {value: 'Warrior', label: 'Warrior'},
        ];

        $scope.classSpec = [
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

        $scope.priority = [
          {label: 'Low', value: 'low'},
          {label: 'Medium', value: 'medium'},
          {label: 'High', value: 'high'}
        ];

        $scope.status = [
          {label: 'Closed', value: 'closed'},
          {label: 'Open', value: 'open'}
        ];
        $scope.submit = function(data) {
            toastr.success('The changes to recruitment have been made', 'Status Updated');
            $http.post('/api/recruitment', $scope.formData);
            console.log('recruitment status submitted:', $scope.formData);
            $state.reload();
        };
    }
    angular
        .module('topshelf.admin.states')
        .controller('RecruitmentCtrl', RecruitmentCtrl);
})();
