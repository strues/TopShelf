(function () {
    'use strict';

    function ResourceCreateCtrl($scope, ResourceFactory, sweet, Auth) {
    // when Save is clicked
        $scope.createResource = function () {
            var resource = {
                websiteName: $scope.newResource.websiteName,
                websiteUrl: $scope.newResource.websiteUrl,
                websiteType:  $scope.newResource.websiteType
            };

        // data to postsFactory service
            ResourceFactory.createResource(resource)
            .success(function () {
                sweet.show('Amazing', 'You\'ve written a new post', 'success');
                $scope.status = 'Created Post! Refreshing Post List.';
            })
            .error(function (error) {
                sweet.show('Oops...', 'Something broke', 'error');
                $scope.status = 'Unable to Create Post: ' + error.message;
            //console.log('$scope.status', $scope.status);
            });

            // reset inputs
            $scope.newResource.websiteName = '';
            $scope.newResource.websiteUrl = '';
            $scope.newResource.websiteType = '';


        }; // end of $scope.createPost

    }
    angular
        .module('topshelf.admin.states')
        .controller('ResourceCreateCtrl', ResourceCreateCtrl);
})();
