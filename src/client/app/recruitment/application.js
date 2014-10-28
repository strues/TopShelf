(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('recruitment', {
                    url: '/recruitment',
                    templateUrl: 'app/recruitment/application.tpl.html',
                    controller: 'ApplicationCtrl'
                })
                .state('applicationList', { 
                    url: '/recruitment/applist', 
                    templateUrl: 'app/recruitment/applicationList.tpl.html', 
                    controller: 'ApplicationListCtrl' 
                })
                .state('applicationEdit', {
                 url: "/recruitment/applist/edit", 
                 templateUrl: 'app/recruitment/applicationEdit.tpl.html', 
                 controller: 'ApplicationEditCtrl' 
               })
              .state('applicationEditId', { 
                url: "/recruitment/applist/edit/:id", 
                templateUrl: 'app/recruitment/applicationEdit.tpl.html', 
                controller: 'ApplicationEditCtrl' 
              });
        });
})();
