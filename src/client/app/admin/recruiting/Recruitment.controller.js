(function() {
  'use strict';
  /**
   * @ngdoc controller
   * @name app.admin.states.controller:RecruitmentCtrl
   *
   * @description angular-form-for
   *
   */
  angular
      .module('app.admin')
      .controller('RecruitmentController', RecruitmentController);

  /* @ngInject */
  function RecruitmentController($scope, Recruitment, $state, toastr) {
    // select options
    $scope.countries = [];
    $scope.states = [];

    $scope.userState = new Object();
    $scope.userCountry = new Object();

    function init() {

      // Countries
      $scope.countries.push({
        'code': 'DK',
        'name': 'Death Knight'
      });
      $scope.countries.push({
        'code': 'DR',
        'name': 'Druid'
      });
      $scope.countries.push({
        'code': 'HNT',
        'name': 'Hunter'
      });
      $scope.countries.push({
        'code': 'MG',
        'name': 'Mage'
      });
      $scope.countries.push({
        'code': 'MK',
        'name': 'Monk'
      });
      $scope.countries.push({
        'code': 'PAL',
        'name': 'Paladin'
      });
      $scope.countries.push({
        'code': 'PR',
        'name': 'Priest'
      });
      $scope.countries.push({
        'code': 'RG',
        'name': 'Rogue'
      });
      $scope.countries.push({
        'code': 'SM',
        'name': 'Shaman'
      });
      $scope.countries.push({
        'code': 'WL',
        'name': 'Warlock'
      });
      $scope.countries.push({
        'code': 'WR',
        'name': 'Warrior'
      });
      // 2 brazilian states
      $scope.states.push({
        'code': 'Blood',
        'name': 'Blood',
        'country': {
          'code': 'DK',
          'name': 'Death Knight'
        }
      });

      $scope.states.push({
        'code': 'FR',
        'name': 'Frost',
        'country': {
          'code': 'DK',
          'name': 'Death Knight'
        }
      });
      $scope.states.push({
        'code': 'UH',
        'name': 'Unholy',
        'country': {
          'code': 'DK',
          'name': 'Death Knight'
        }
      });
      // 2 american states
      $scope.states.push({
        'code': 'Bal',
        'name': 'Balance',
        'country': {
          'code': 'DR',
          'name': 'Druid'
        }
      });

      $scope.states.push({
        'code': 'FR',
        'name': 'Feral',
        'country': {
          'code': 'DR',
          'name': 'Druid'
        }
      });
      $scope.states.push({
        'code': 'GRD',
        'name': 'Guardian',
        'country': {
          'code': 'DR',
          'name': 'Druid'
        }
      });
      $scope.states.push({
        'code': 'RST',
        'name': 'Restoration',
        'country': {
          'code': 'DR',
          'name': 'Druid'
        }
      });

      $scope.states.push({
        'code': 'BM',
        'name': 'Beast Mastery',
        'country': {
          'code': 'HNT',
          'name': 'Hunter'
        }
      });
      $scope.states.push({
        'code': 'MM',
        'name': 'Marksman',
        'country': {
          'code': 'HNT',
          'name': 'Hunter'
        }
      });
      $scope.states.push({
        'code': 'SV',
        'name': 'Survival',
        'country': {
          'code': 'HNT',
          'name': 'Hunter'
        }
      });

      $scope.states.push({
        'code': 'AC',
        'name': 'Arcane',
        'country': {
          'code': 'MG',
          'name': 'Mage'
        }
      });
      $scope.states.push({
        'code': 'FI',
        'name': 'Fire',
        'country': {
          'code': 'MG',
          'name': 'Mage'
        }
      });
      $scope.states.push({
        'code': 'FR',
        'name': 'Frost',
        'country': {
          'code': 'MG',
          'name': 'Mage'
        }
      });

      $scope.states.push({
        'code': 'BrM',
        'name': 'Brewmaster',
        'country': {
          'code': 'MK',
          'name': 'Monk'
        }
      });
      $scope.states.push({
        'code': 'MW',
        'name': 'Mistweaver',
        'country': {
          'code': 'MK',
          'name': 'Monk'
        }
      });
      $scope.states.push({
        'code': 'WW',
        'name': 'Windwalker',
        'country': {
          'code': 'MK',
          'name': 'Monk'
        }
      });

      $scope.states.push({
        'code': 'HL',
        'name': 'Holy',
        'country': {
          'code': 'PAL',
          'name': 'Paladin'
        }
      });
      $scope.states.push({
        'code': 'PR',
        'name': 'Protection',
        'country': {
          'code': 'PAL',
          'name': 'Paladin'
        }
      });
      $scope.states.push({
        'code': 'RT',
        'name': 'Retribution',
        'country': {
          'code': 'PAL',
          'name': 'Paladin'
        }
      });

      $scope.states.push({
        'code': 'DS',
        'name': 'Discipline',
        'country': {
          'code': 'PR',
          'name': 'Priest'
        }
      });
      $scope.states.push({
        'code': 'HL',
        'name': 'Holy',
        'country': {
          'code': 'PR',
          'name': 'Priest'
        }
      });
      $scope.states.push({
        'code': 'SH',
        'name': 'Shadow',
        'country': {
          'code': 'PR',
          'name': 'Priest'
        }
      });

      $scope.states.push({
        'code': 'AS',
        'name': 'Assassination',
        'country': {
          'code': 'RG',
          'name': 'Rogue'
        }
      });
      $scope.states.push({
        'code': 'CB',
        'name': 'Combat',
        'country': {
          'code': 'RG',
          'name': 'Rogue'
        }
      });
      $scope.states.push({
        'code': 'SB',
        'name': 'Subtlety',
        'country': {
          'code': 'RG',
          'name': 'Rogue'
        }
      });

      $scope.states.push({
        'code': 'EL',
        'name': 'Elemental',
        'country': {
          'code': 'SM',
          'name': 'Shaman'
        }
      });
      $scope.states.push({
        'code': 'EH',
        'name': 'Enhancement',
        'country': {
          'code': 'SM',
          'name': 'Shaman'
        }
      });
      $scope.states.push({
        'code': 'RST',
        'name': 'Restoration',
        'country': {
          'code': 'SM',
          'name': 'Shaman'
        }
      });

      $scope.states.push({
        'code': 'AF',
        'name': 'Affliction',
        'country': {
          'code': 'WL',
          'name': 'Warlock'
        }
      });
      $scope.states.push({
        'code': 'DST',
        'name': 'Destruction',
        'country': {
          'code': 'WL',
          'name': 'Warlock'
        }
      });
      $scope.states.push({
        'code': 'DMO',
        'name': 'Demonology',
        'country': {
          'code': 'WL',
          'name': 'Warlock'
        }
      });

      $scope.states.push({
        'code': 'AR',
        'name': 'Arms',
        'country': {
          'code': 'WR',
          'name': 'Warrior'
        }
      });
      $scope.states.push({
        'code': 'FY',
        'name': 'Fury',
        'country': {
          'code': 'WR',
          'name': 'Warrior'
        }
      });
      $scope.states.push({
        'code': 'PRT',
        'name': 'Protection',
        'country': {
          'code': 'WR',
          'name': 'Warrior'
        }
      });
    }

    init();

    // $scope.classType = {
    //   options: [
    //   'Death Knight', 'Druid', 'Hunter', 'Mage', 'Monk', 'Paladin',
    //   'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'
    //   ]
    // };

    $scope.formData = {};
    $scope.submit = function(formData) {
      Recruitment.create($scope.formData).success(function() {
        console.log('admin-recruitment status submitted:',
            $scope.formData);
        toastr.success('Recruitment changed', 'Status Updated');
        $state.reload();
      });
    };
  }
}());
