(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.recruitment.controller:ApplicationListCtrl
   *
   * @description
   *
   */

    function ApplicationListCtrl ($scope, ApplicationFactory, $http, $timeout, $location) {
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
                columnFilter: true,
                displayName: 'Posted'
            }
            ]
        };

        ApplicationFactory.getAllApplications().then(function(response) {
            $scope.appGrid.data = response.data;
        });
        // var dateAsString = $filter('date')($scope.application, 'yyyy-MM-dd');
    }

    angular
      .module('topshelf.admin.states')
      .controller('ApplicationListCtrl', ApplicationListCtrl);
})();
