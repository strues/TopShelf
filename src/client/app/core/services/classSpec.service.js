(function() {

  'use strict';

  angular
    .module('app.core')
    .factory('classSpec', classSpec);

  function classSpec() {
    function getClassSpecs() {
      return [{
          'value': 'Assassination',
          'name': 'Assassination'
        }, {
          'value': 'Affliction',
          'name': 'Affliction'
        }, {
          'value': 'Arcane',
          'name': 'Arcane'
        }, {
          'value': 'Arms',
          'name': 'Arms'
        }, {
          'value': 'Balance',
          'name': 'Balance'
        }, {
          'value': 'Beast Mastery',
          'name': 'Beast Mastery'
        }, {
          'value': 'Brewmaster',
          'name': 'Brewmaster'
        }, {
          'value': 'Combat',
          'name': 'Combat'
        }, {
          'value': 'Destruction',
          'name': 'Destruction'
        }, {
          'value': 'Demonology',
          'name': 'Demonology'
        }, {
          'value': 'Discipline',
          'name': 'Discipline'
        }, {
          'value': 'Elemental',
          'name': 'Elemental'
        }, {
          'value': 'Enhancement',
          'name': 'Enhancement'
        }, {
          'value': 'Frost',
          'name': 'Frost'
        }, {
          'value': 'Feral',
          'name': 'Feral'
        }, {
          'value': 'Fury',
          'name': 'Fury'

        }, {
          'value': 'Fire',
          'name': 'Fire'
        }, {
          'value': 'Guardian',
          'name': 'Guardian'
        }, {
          'value': 'Holy',
          'name': 'Holy'
        }, {
          'value': 'Restoration',
          'name': 'Restoration'
        }, {
          'value': 'Marksman',
          'name': 'Marksman'
        }, {
          'value': 'Mistweaver',
          'name': 'Mistweaver'
        }, {
          'value': 'Protection',
          'name': 'Protection'
        }, {
          'value': 'Retribution',
          'name': 'Retribution'
        }, {
          'value': 'Shadow',
          'name': 'Shadow'
        }, {
          'value': 'Subtlety',
          'name': 'Subtlety'
        }, {
          'value': 'Survival',
          'name': 'Survival'
        }, {
          'value': 'Unholy',
          'name': 'Unholy'
        }, {
          'value': 'Windwalker',
          'name': 'Windwalker'
        }
      ];
    }

    return {
      getClassSpecs: getClassSpecs
    };
  }

})();
