(function()
{
  'use strict';

  angular
    .module('app.admin')
    .controller('RecruitmentCtrl', RecruitmentCtrl);

  RecruitmentCtrl.$inject = ['recruitSvc', '$state', 'toastr'];

  function RecruitmentCtrl(recruitSvc, $state, toastr)
  {

    /*jshint validthis: true */
    var vm = this;

    vm.recruitData = {};

    vm.submit = function()
    {
      recruitSvc.create(vm.recruitData).success(function(data)
      {
        vm.recruitData = {};
        vm.message = data.message;
        toastr.success('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error)
      {
        toastr.error('There was a problem with the server' +
          error.message, 'Something broke');
      });
    }; // end of $scope.createPost

    ////////////////////////////

    vm.statusOptions = [
    {
      'value': 'true',
      'label': 'Yes'
    },
    {
      'value': 'false',
      'label': 'No'
    }];
    vm.classDefs = [
    {
      'value': 'deathknight',
      'label': 'Death Knight'
    },
    {
      'value': 'druid',
      'label': 'Druid'
    },
    {
      'value': 'hunter',
      'label': 'Hunter'
    },
    {
      'value': 'mage',
      'label': 'Mage'
    },
    {
      'value': 'monk',
      'label': 'Monk'
    },
    {
      'value': 'paladin',
      'label': 'Paladin'
    },
    {
      'value': 'priest',
      'label': 'Priest'
    },
    {
      'value': 'rogue',
      'label': 'Rogue'
    },
    {
      'value': 'shaman',
      'label': 'Shaman'
    },
    {
      'value': 'warlock',
      'label': 'Warlock'
    },
    {
      'value': 'warrior',
      'label': 'Warrior'
    }];

    vm.specDefs = [
      {
        'value': 'Assassination',
        'label': 'Assassination'
      },
      {
        'value': 'Affliction',
        'label': 'Affliction'
      },
      {
        'value': 'Arcane',
        'label': 'Arcane'
      },
      {
        'value': 'Arms',
        'label': 'Arms'
      },
      {
        'value': 'Balance',
        'label': 'Balance'
      },
      {
        'value': 'Beast Mastery',
        'label': 'Beast Mastery'
      },
      {
        'value': 'Brewmaster',
        'label': 'Brewmaster'
      },
      {
        'value': 'Combat',
        'label': 'Combat'
      },
      {
        'value': 'Destruction',
        'label': 'Destruction'
      },
      {
        'value': 'Demonology',
        'label': 'Demonology'
      },
      {
        'value': 'Discipline',
        'label': 'Discipline'
      },
      {
        'value': 'Elemental',
        'label': 'Elemental'
      },
      {
        'value': 'Enhancement',
        'label': 'Enhancement'
      },
      {
        'value': 'Frost',
        'label': 'Frost'
      },

      {
        'value': 'Feral',
        'label': 'Feral'
      },
      {
        'value': 'Fury',
        'label': 'Fury'

      },
      {
        'value': 'Fire',
        'label': 'Fire'
      },
      {
        'value': 'Guardian',
        'label': 'Guardian'

      },
      {
        'value': 'Holy',
        'label': 'Holy'
      },
      {
        'value': 'Restoration',
        'label': 'Restoration'
      },
      {
        'value': 'Marksman',
        'label': 'Marksman'
      },
      {
        'value': 'Mistweaver',
        'label': 'Mistweaver'
      },

      {
        'value': 'Protection',
        'label': 'Protection'
      },
      {
        'value': 'Retribution',
        'label': 'Retribution'
      },

      {
        'value': 'Shadow',
        'label': 'Shadow'
      },

      {
        'value': 'Subtlety',
        'label': 'Subtlety'
      },
      {
        'value': 'Survival',
        'label': 'Survival'
      },
      {
        'value': 'Unholy',
        'label': 'Unholy'
      },
      {
        'value': 'Windwalker',
        'label': 'Windwalker'
      }
    ];

    vm.priorityOpt = [
    {
      'value': 'low',
      'label': 'Low'
    },
    {
      'value': 'medium',
      'label': 'Medium'
    },
    {
      'value': 'high',
      'label': 'High'
    }];
  }

})();
