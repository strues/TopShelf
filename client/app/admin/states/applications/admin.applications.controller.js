(function () {
    'use strict';

  /**
   * @ngdoc controller
   * @name ApplicationListCtrl
   *
   * @description Displays a list of all applications returned in a grid
   *
   */

    angular
      .module('app.admin.states')
      .controller('ApplicationListCtrl', ApplicationListCtrl);
                                    /* @ngInject */
    function ApplicationListCtrl ($scope, Application, $http, $timeout, $location) {
      /*
        @todo build react files from source for optimal customization
       */
        $scope.appGrid = {
            data: [],
            columnDefs: [
            {
                field: 'charName',
                columnFilter: true,
                displayName: 'Character Name',
                render: function(application) {
                      return React.DOM.a({href:'javascript:', onClick: function() {
                          $scope.selectApp = application;
                          $location.path('/admin/applications/view/' + application._id);
                      }}, application.charName);
                  }
            },
            {
                field: 'charClass',
                columnFilter: true,
                displayName: 'Class'
            },
            {
                field: 'charSpec',
                columnFilter: true,
                displayName: 'Spec'
            },
            {
                field: 'created',
                displayName: 'Posted'
            },
            {
                field: 'delete',
                columnFilter: false,
                displayName: 'Actions',
                render: function(application) {
                      return React.DOM.a({href:'javascript:', onClick: function() {
                          $scope.selectApp = application;
                          $http.delete('/api/applications' + '/' + application._id);
                      }}, 'Delete');
                  }
              },
            ]
        };

        Application.getAllApplications().then(function(response) {
            $scope.appGrid.data = response.data;
        });
        // var dateAsString = $filter('date')($scope.application, 'yyyy-MM-dd');
    }

})();
