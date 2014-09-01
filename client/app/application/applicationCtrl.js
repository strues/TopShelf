'use strict';

angular.module('app')
.controller('ApplicationCtrl', function($scope, $state, $http, Application) {

 $scope.formData = {};
    $scope.formFields = [
        {
            //the key to be used in the result values {... 'username': 'johndoe' ... }
            key: 'charName',
            type: 'text',
            label: 'Character Name',
            placeholder: 'Rekt',
            required: true,
            disabled: false
        },
        {
        key: 'charClass',
        type: 'select',
        label: 'What class is your character?',
        options: [
            {
                'name': 'Death Knight',
                'value': 'deathknight'
            },
            {
                'name': 'Druid',
                'value': 'druid'
            },
            {
                'name': 'Hunter',
                'value': 'hunter'
            },
            {
                'name': 'Mage',
                'value': 'mage'
            },
            {
                'name': 'Monk',
                'value': 'monk'
            },
            {
                'name': 'Paladin',
                'value': 'paladin'
            },
            {
                'name': 'Priest',
                'value': 'priest'
            },
            {
                'name': 'Rogue',
                'value': 'rogue'
            },
            {
                'name': 'Shaman',
                'value': 'shaman'
            },
            {
                'name': 'Warlock',
                'value': 'warlock'
            },
            {
                'name': 'Warrior',
                'value': 'warrior'
            }
          
        ]}, // end char class
      {
        key: 'charSpec',
        type: 'text',
        label: 'What spec is your character?',
      },
      {
        key: 'charOffSpec',
        type: 'text',
        label: 'What is your characters offspec?',
      },
    {
        key: 'charArmory',
        type: 'text',
        label: 'Please link us to your armory page',
        placeholder: 'http://us.battle.net'
      },
     {
        key: 'charLogs',
        type: 'text',
        label: 'Please link us to your Warcraft Logs',
        placeholder: 'http:/www.warcraftlogs.com'
      },
    {
        key: 'heroicXP',
        type: 'textarea',
        label: 'Heroic Experience',
        placeholder: 'Describe your heroic raiding experience'
      },
          {
        key: 'pastGuilds',
        type: 'textarea',
        label: 'Previous Guilds',
        placeholder: 'What guilds have you been involved with in the past? How long were you there and why did you leave?'
      },
       {
        key: 'microphone',
        type: 'radio',
        label: 'Do you have a working mic / headset?',
        options: [
            {
                'name': 'Yes, and I use it!',
                'value': 'yesyes'
            },
            {
                'name': 'Yes, but I dont speak',
                'value': 'yesno'
            },
            {
                'name': 'Nope',
                'value': 'no'
            }
        ]
    },
    {
        key: 'pcSpecs',
        type: 'textarea',
        label: 'PC and Internet Specs',
        placeholder: 'Briefly describe your PC and Internet. We dont accept members with constant Internet problems and/or computers from a welfare distribution center.'
      },
      {
        key: 'uiScreenshot',
        type: 'text',
        label: 'UI Screenshot'
      },
      {
        key: 'whyTS',
        type: 'textarea',
        label: 'Why Top Shelf?',
        placeholder: 'What made you choose Top Shelf over other guilds? Why should be add you to our family?'
      },

    ];

    $scope.formOptions = {
        //Set the id of the form
        uniqueFormId: 'appForm'
    };

    $scope.onSubmit = function() {
        $http.post('/api/applications', $scope.formData);
        console.log('form submitted:', $scope.formData);
    };
});