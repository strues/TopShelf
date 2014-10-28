angular
.module('app')
.controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($rootScope, $scope, $location, $window, User, Auth) {
    //var vm = this;


  $scope.updateProfile = function(profile) {
    Auth.updateProfile({ email: profile.email, name: profile.name}, function(data) {
        $window.localStorage.token = data.token;
              var payload = JSON.parse($window.atob(data.token.split('.')[1]));
              $rootScope.currentUser = User.get({ id: payload._id });
              $scope.error = '';
    }, function(err) {
      console.log('Error: ', err);
      $scope.error = err.data.message;
    });
  };

  $scope.destroy = function() {
    Auth.deleteProfile(function(response) {
      console.log(response);
      Auth.logout();
    }, function(err) {
      console.log(err);
    });
  };

}
