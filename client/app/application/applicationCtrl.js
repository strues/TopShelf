'use strict';

angular.module('app')
.controller('ApplicationCtrl', function($scope, $http, Application) {
  
  // we will store all of our form data in this object
  $scope.formData = {};
  
  // function to process the form
  $scope.processForm = function(formData) {
  $http.post('/api/applications', $scope.formData)
  .success(function(data){
  console.log(data);
  });

    
  };
//http://stackoverflow.com/questions/15894650/http-post-in-angular-js
//http://www.treselle.com/blog/angular-js-post-data-submitting-ajax-forms/
   $scope.classList = [
      {value: 'deathknight', label: 'Death Knight'},
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

     $scope.microphoneInfo = [
      {label: 'Working', value: 'working'},
      {label: 'None', value: 'none'},
      {label: 'Dont Talk', value: 'silent'}
    ];
  
});