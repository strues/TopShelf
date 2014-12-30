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
        ($scope, $http, $stateParams, ApplicationFactory, LikeService, $location) {
  //  var vm = this;
    //vm.ctrlName = 'ApplicationEditCtrl';

    var applicationId = $stateParams.id;

    if (applicationId && applicationId.length > 0) {
        $http.get('/api/applications/' + applicationId)
        .success(function(application) {
            $scope.application = application;
        });
    }

    //Like a post
    $scope.likeApplication = function likeApplication() {
        if (!LikeService.isAlreadyLiked(applicationId)) {
            ApplicationFactory.likeApplication(applicationId).success(function(data) {
                $scope.application.likes++;
                LikeService.like(applicationId);
                $scope.isAlreadyLiked = true;
            })
        .error(function(data, status) {
            console.log(status);
            console.log(data);
        });
        }
    };

    //Unlike a post
    $scope.unlikeApplication = function unlikeApplication() {
        if (LikeService.isAlreadyLiked(applicationId)) {
            ApplicationFactory.unlikeApplication(applicationId).success(function (data) {
                $scope.application.likes--;
                LikeService.unlike(applicationId);
                $scope.isAlreadyLiked = false;
            })
    .error(function (data, status) {
        console.log(status);
        console.log(data);
    });
        }
    };
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
        .module('topshelf.admin')
        .controller('ApplicationViewCtrl', ApplicationViewCtrl);
})();
