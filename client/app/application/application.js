'use strict';

angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
    // route to show our basic form (/form)
    .state('application', {
      url: '/',
      templateUrl: 'app/application/application.tpl.html',
      controller: 'ApplicationCtrl',
      controllerAs: 'vm',
      data: { pageTitle: 'Application'}
  
    })
    
    // nested states 
    // each of these sections will have their own view
    // url will be nested (/form/profile)
    .state('application.character', {
      url: '/character',
      templateUrl: 'app/application/application-character.tpl.html'
    })
    
    // url will be /form/interests
    .state('application.raid', {
      url: '/raid',
      templateUrl: 'app/application/application-raid.tpl.html'
    })
    
    // url will be /form/payment
    .state('application.about', {
      url: '/about',
      templateUrl: 'app/application/application-about.tpl.html'
    })

      .state('application.submit', {
      url: '/submit',
      templateUrl: 'app/application/application-submit.tpl.html'
    });

    
  // catch all route
  // send users to the form page 
  $urlRouterProvider.otherwise('/application');
})
