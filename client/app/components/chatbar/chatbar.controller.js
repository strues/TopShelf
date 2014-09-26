'use strict';

angular.module('guildApp')
 .controller('ChatbarCtrl', function ($scope, $location, $modal, $cookieStore, Auth, User, Conversation, socket) {
    
    if(!$cookieStore.get('token')) { return false;
    }

    /*
      Sync conversation messages over socket connection!
    */
    User
      .get()
      .$promise
      .then(function (res){
        $scope.user = [res];
        socket.syncUpdates('user', $scope.user);
      });

    $scope.$on('$destroy', function (){
      socket.unsyncUpdates('user');
    });

    $scope.activeFriendConversation = {};
    $scope.talkingTo = {};
    $scope.showConversation = false;

    $scope.setFriendConversation = function (friend){
      $scope.showConversation = true;
      $scope.talkingTo = friend;

      $scope.user[0].conversations.forEach(function (conversation){
        conversation.participants.forEach(function (participant){
          if(participant === friend._id) {
            $scope.activeFriendConversation = conversation;
          }
        });
      });
    };

    $scope.sendMessage = function (conversationID){
      console.log('wat', conversationID, $scope.chatbarMessage);
      Conversation.addMessage({
        id: conversationID,
        message: {
          name: $scope.user[0].name,
          text: $scope.chatbarMessage
        }
      });
    };

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'manage-friends.html',
        /*jshint evil:true */
        controller: ModalInstanceCtrl, 
        size: size,
        resolve: {
          requests: function () {
            return $scope.user[0].friendrequests;
          },
          friends: function (){
            return $scope.user[0].friendlist;
          }
        }
      });
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, requests, friends, User) {

      $scope.requests = requests;
      $scope.friends = friends;

      $scope.accept = function(userID){
        User.acceptFriendRequest({requestID: userID});
        $scope.removeRequest(userID);
      };

      $scope.request = function (){
        User.sendFriendRequest({email: document.getElementById('friend-email-input').value});
      };

      $scope.reject = function(userID){
        User.rejectFriendRequest({requestID: userID});
        $scope.removeRequest(userID);
      };

      $scope.remove = function (userID){
        User.removeFriend({}, {friendID: userID});
        $scope.removeFriend(userID);
      };

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.removeRequest = function (userID) {
        $scope.requests.forEach(function (req, index){
          if(req._id === userID) {
            $scope.requests.splice(index, 1);
          }
        });
      };

      $scope.removeFriend = function (userID) {
        $scope.friends.forEach(function (friend, index){
          if(friend._id === userID) {
            $scope.friends.splice(index, 1);
          }
        });
      };
    
    };

  });