(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name guild.recruitment.controller:ApplicationCtrl
   *
   * @description
   *
   */

    function ApplicationCtrl($location, ApplicationFactory, toastr) {
    var application = this;
    application.data = {};

    application.genders = [
                  {label: 'Male', value: 'Dude'},
                  {label: 'Female', value: 'Bitch'},
                  {label: 'Unspecified', value: 'Tranny'}
                ];

    application.classOptions = [
        {value: 'deathKnight', label: 'Death Knight'},
        {value: 'druid', label: 'Druid'},
        {value: 'hunter', label: 'Hunter'},
        {value: 'mage', label: 'Mage'},
        {value: 'monk', label: 'Monk'},
        {value: 'paladin', label: 'Paladin'},
        {value: 'priest', label: 'Priest'},
        {value: 'rogue', label: 'Rogue'},
        {value: 'shaman', label: 'Shaman'},
        {value: 'warlock', label: 'Warlock'},
        {value: 'warrior', label: 'Warrior'}
    ];
    application.specOptions = [
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

    application.alerts = [
    {type: 'danger', msg: 'All fields are required for your application. If you cannot see' +
    ' what youve written in the preview area, it contains an error and we will not receive' +
    ' your application. Make sure all URLs are valid, ie http://topshelfguild.com'}
  ];

    application.closeAlert = function(index) {
        application.alerts.splice(index, 1);
    };

    application.submit = function(valid) {
        if (!valid) {
            return;
        }

        application.submitting = true;

        ApplicationFactory.createApplication(application.data)
          .then(function () {
              application.data = {};
              toastr.success('Your application was submitted!', 'Expect to hear from us soon');

              console.log('form submitted:', application.data);
              $location.path('/completed');
          },
            function() {
                application.submitting = false;
            });
    };

    application.goBack = function () {
        $location.path('/');
    };

}
    angular
        .module('topshelf.guild')
        .controller('ApplicationCtrl', ApplicationCtrl);
})();
