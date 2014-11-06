(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name guild.recruitment.controller:ApplicationCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.guild')
    .controller('ApplicationCtrl', ApplicationCtrl);

  function ApplicationCtrl($scope, $http, $location, socket, ngToast) {
   // var vm = this;
   $scope.formData = {};
   $scope.formFields = [
          {
              //the key to be used in the result values {... "username": "johndoe" ... }
              key: 'charName',
              type: 'text',
              label: 'Character Name',
              name: 'Character Name',
              placeholder: 'Laerel',
              required: true,
              disabled: false, //default: false
              description: 'The name of your main character'
          },
          {
              key: 'charClass',
              type: 'select',
              label: 'Character Class',
              name: 'Character Class',
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
                }
              ]
          },
          {
              key:'charSpec',
              type:'select',
              label:'Character Spec',
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
              key: 'charArmory',
              type: 'text',
              label: 'Armory',
              placeholder: 'http://us.battle.net',
              required: true,
              disabled: false, //default: false
              description: 'Link to your armory'
          },
          {
              key: 'charLogs',
              type: 'text',
              label: 'Warcraft Logs',
              placeholder: 'http://www.warcraftlogs.com',
              required: true,
              disabled: false, //default: false
              description: 'Link to your recent logs'
          },
          {
              key: 'applicantName',
              type: 'text',
              label: 'First Name',
              placeholder: 'John',
              required: true,
              disabled: false
          },
          {
              key: 'applicantAge',
              type: 'number',
              label: 'Age',
              default: '18',
              min: '18',
              max: '50'
          },
          {
              key: 'applicantLocation',
              type: 'select',
              Label: 'Timezone',
              options: [
                  {
                    'name':'PST',
                    'value':'pst'
                  },
                  {
                    'name':'MST',
                    'value':'mst'
                  },
                  {
                    'name':'CST',
                    'value':'cst'
                  },
                  {
                    'name':'EST',
                    'value':'EST'
                  },
                  {
                    'name':'Other',
                    'value':'other'
                  }
              ]
          },
          {
              key: 'applicantRealId',
              type: 'text',
              label: 'RealID',
              placeholder: 'JohnDoe#1234',
              required: true,
              disabled: false
          },
          {
            key:'applicantSex',
            label:'Sex',
            type:'select',
            options: [
                {
                  'name':'Male',
                  'value':'male'
                },
                {
                  'name':'Female',
                  'value':'female'
                }
            ]
          },
          {
            type:'textarea',
            key:'heroicXP',
            label:'Heroic Experience',
            placeholder:'Past progression'
          },
          {
            type:'textarea',
            label:'Guild History',
            key:'pastGuilds',
            placeholder: 'Previous guilds you have been in'
          },
          {
            type:'select',
            label:'Mumble',
            key:'voiceCom',
            options:[
              {
                'name':'Yes',
                'value':'yes'
              },
              {
                'name':'No',
                'value':'no'
              },
              {
                'name':'Silent',
                'value':'silent'
              }
            ]
          },
          {
            type:'text',
            key:'screenshot',
            label:'UI Screenshot',
            placeholder: 'imgur',
            required: true
          },
          {
            type:'textarea',
            label: 'Why Top Shelf',
            key:'whyTS',
            placeholder: 'Why Top Shelf? What makes you different than other applicants?'
          }
      ]; //end form fields

      $scope.formOptions = {
          //Set the id of the form
          uniqueFormId: 'application'
      };

      $scope.onSubmit = function() {
          $http.post('/api/applications', $scope.formData)
          ngToast.create('Application submitted');
          console.log('form submitted:', $scope.formData);
      };
}
})();
