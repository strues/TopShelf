(function () {
    'use strict';

  /**
   * @ngdoc object
   * @name admin.recruitment.controller:ApplicationListCtrl
   *
   * @description
   *
   */

    function ApplicationViewCtrl
        ($scope, $http, $stateParams, ApplicationFactory, $location) {

    var applicationId = $stateParams.id;
    var urlBase = 'https://us.api.battle.net/wow/character/';
    var jspcb = 'jsonp=JSON_CALLBACK';
    var apiKey = 'apikey=jbdqc3ufm6hfzpymxc3ej52988vvh59b';
    var loc = 'locale=en_US';

    if (applicationId && applicationId.length > 0) {
        $http.get('/api/applications/' + applicationId)
        .success(function(application) {
            $scope.application = application;
    //https://us.api.battle.ne locale=en_US&jsonp=JSON_CALLBACK&apikey=4gfahazrsuk3qaw4ja4ddhxcreg4qwy7);
            $http.jsonp(urlBase + application.charServer + '/' + application.charName +
            '?fields=items%2C+progression' + '&' + loc + '&' + jspcb + '&' + apiKey, {
              headers: {'Accept-Encoding': 'gzip'}})
        .success(function(data, headers) {
            $scope.charData = data;
        });
        });
    }

    $scope.saveApplication = function() {
        if (applicationId && applicationId.length > 0) {
            $http.put('/api/applications/' + applicationId,
              $scope.application).success(function(application) {
                $location.path('/admin/applications');
            });
        }
        else {
            $http.post('/api/applications', $scope.application)
              .success(function(application) {
                $location.path('/admin/applications');
            });
        }
    };

    $http.get('/api/applications').success(function(applications) {
        $scope.applicationList = applications;
    });
}
    angular
        .module('topshelf.admin.states')
        .controller('ApplicationViewCtrl', ApplicationViewCtrl);
})();
