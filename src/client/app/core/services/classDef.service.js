(function() {
  
  angular
    .module('app.core')
    .factory('classDef', classDef);

  function classDef() {
    function getClassDefs() {
      return [
        {
          'value': 'deathknight',
          'name': 'Death Knight'
        }, {
          'value': 'druid',
          'name': 'Druid'
        }, {
          'value': 'hunter',
          'name': 'Hunter'
        }, {
          'value': 'mage',
          'name': 'Mage'
        }, {
          'value': 'monk',
          'name': 'Monk'
        }, {
          'value': 'paladin',
          'name': 'Paladin'
        }, {
          'value': 'priest',
          'name': 'Priest'
        }, {
          'value': 'rogue',
          'name': 'Rogue'
        }, {
          'value': 'shaman',
          'name': 'Shaman'
        }, {
          'value': 'warlock',
          'name': 'Warlock'
        }, {
          'value': 'warrior',
          'name': 'Warrior'
        }
      ];
    }

    return {
      getClassDefs: getClassDefs
    };
  }

})();
