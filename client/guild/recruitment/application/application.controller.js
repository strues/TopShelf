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
    this.data = {};
    var self = this;
        this.genders = [
                  {label: 'Male', value: 'Dude'},
                  {label: 'Female', value: 'Bitch'},
                  {label: 'Unspecified', value: 'Tranny'}
                ];

        this.classOptions = [
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
        this.specOptions = [
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

        this.yesNo = [
            {value: 'yes', label: 'Yes'},
            {value: 'no', label: 'No'}
        ];


  this.submit = function(valid) {
        if(!valid) {
           return;
        }

        self.submitting = true;

        $http.post('/api/applications', self.data).then(function() {
          self.data = {};
          ngToast.create('Application submitted');
          console.log('form submitted:', self.data);
          $location.path('/completed');
        }, function(response) {
          self.submitting = false;
        });
      };

      this.goBack = function () {
        $location.path('/');
      };
}
})();
