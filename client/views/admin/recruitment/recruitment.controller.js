(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecruitmentCtrl', RecruitmentCtrl);

    function RecruitmentCtrl ($scope, $http, $location, socket, recruitmentFactory) {

      $scope.formData = {};
      $scope.formFields = [
         {
        key: 'classType',
        type: 'select',
        label: 'Class Needed',
        name: 'Class Needed',
        options: [
          {
            'name':'Death Knight',
            'value': 'deathknight'
          },
          {
            'name':'Druid',
            'value': 'druid'
          },
          {
            'name':'Hunter',
            'value': 'hunter'
          },
          {
            'name':'Mage',
            'value': 'mage'
          },
          {
            'name':'Monk',
            'value': 'monk'
          },
          {
            'name':'Paladin',
            'value': 'paladin'
          },
          {
            'name':'Priest',
            'value': 'priest'
          },
          {
            'name':'Rogue',
            'value':'rogue'
          },
          {
            'name':'Shaman',
            'value':'shaman'
          },
          {
            'name':'Warlock',
            'value':'warlock'
          },
          {
            'name':'Warrior',
            'value':'warrior'
          }]
       },
       {
        key:'classSpec',
        type:'select',
        label:'Desired Spec',
        options: [
            {value: 'affliction', name: 'Affliction'},
            {value: 'arcane', name: 'Arcane'},
            {value: 'arms', name:'Arms'},
            {value: 'assassination', name:'Assasination'},
            {value: 'balance', name: 'Balance'},
            {value: 'beastmaster', name:'Beast Mastery'},
            {value: 'blood', name:'Blood'},
            {value: 'brewmaster', name: 'Brewmaster'},
            {value: 'combat', name:'Combat'},
            {value: 'demonology', name:'Demonology'},
            {value: 'destruction', name:'Destruction'},
            {value: 'discipline', name:'Discipline'},
            {value: 'elemental', name:'Elemental'},
            {value: 'enhancement', name:'Enhancement'},
            {value: 'feral', name: 'Feral'},
            {value: 'fire', name:'Fire'},
            {value: 'frost', name: 'Frost'},
            {value: 'fury', name: 'Fury'},
            {value: 'guardian', name:'Guardian'},
            {value: 'holy', name:'Holy'},
            {value: 'marksman', name: 'Marksman'},
            {value: 'mistweaver', name:'Mistweaver'},
            {value: 'protection', name:'Protection'},
            {value: 'restoration', name:'Restoration'},
            {value: 'retribution', name:'Retribution'},
            {value: 'shadow', name:'Shadow'},
            {value: 'subtlety', name:'Subtlety'},
            {value: 'survival', name:'Survival'},
            {value: 'unholy', name:'Unholy'},
            {value:'windwalker', name:'Windwalker'}
        ]
       },

          {
              key: 'priority',
              type: 'select',
              Label: 'Priority',
              options: [
              {
                'name':'Low',
                'value':'low'
              },
              {
                'name':'Medium',
                'value':'medium'
              },
              {
                'name':'High',
                'value':'high'
              }
              ]
          },

          {
            key:'status',
            label:'Status',
            type:'select',
            options: [
            {
              'name':'Open',
              'value':'open'
            },
            {
              'name':'Closed',
              'value':'closed'
            }
            ]
          }
      ];

      $scope.formOptions = {
          //Set the id of the form
          uniqueFormId: 'recruitment'
      };
socket.syncUpdates('recruitment', $scope.recruitments);
      $scope.onSubmit = function() {
          $http.post('/api/recruitment', $scope.formData)
          console.log('recruitment status submitted:', $scope.formData);
      };
}
})();
