'use strict';

angular.module('guildApp')
  .controller('ChatCtrl', function ($scope, $http, $cookieStore, socket, Conversation, User) {
    var cid = 'chat';

    $scope.role = 'reader';
    $scope.autoScroll = true;
    $scope.controls = {
      moderator: false,
      ban: false,
      mute: false
    };

    if($cookieStore.get('token')) {
      $scope.user = User.get();
    }

    $scope.sendMessage = sendMessage;

    Conversation
      .getPublic({id: cid})
      .$promise
      .then(function (res){
        $scope.conversation = [res];

        $scope.$watch('conversation[0].moderators', function (mods){
          if($scope.user){
            mods.forEach(function (modID){
              if($scope.user._id === modID) {
                $scope.role = 'moderator';
              }
            });
          }
        });

        $scope.$watch('conversation[0].admins', function (admins){
          if($scope.user){
            admins.forEach(function (adminID){
              if($scope.user._id === adminID) {
                $scope.role = 'admin';
              }
            });
          }
        });

        $scope.$watch('conversation[0].messages', function (newv, oldv){
          if(!$scope.autoScroll) {
            return false;
          }
          var chatContainer = document.getElementsByClassName('chat-container')[0];
          setTimeout(function(){chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 
            0
            );
        });

        socket.socket.emit('conversation:notify:online', {conversationID: cid});

        socket.syncUpdates('conversation', $scope.conversation);
      }, function (err){
        console.log(err);
      });

    $scope.$on('$destroy', function (){
      socket.socket.emit('conversation:notify:offline', {conversationID: cid});
      socket.unsyncUpdates('conversation');
    });

    $scope.maySend = maySend;
    $scope.formatDate = formatDate;
    $scope.toggleControls = toggleControls;
    $scope.toggleAutoScroll = toggleAutoScroll;
           /*jshint evil:true */


    function toolAction($event){
          $scope.toolAction = toolAction;
      console.log($event);
      var active;

      function isModerator(userID){
        var isMod = false;

        $scope.conversation[0].moderators.forEach(function (modID){
          if(modID === userID) { 
            isMod = true;
          }
        });

        return isMod;
      }

      function isBanned(userID){
        var isBanned = false;

        $scope.conversation[0].banlist.forEach(function (ban){
          if(ban.userID === userID) {
            isBanned = true;
          }
        });

        return isBanned;
      }

      for(var i in $scope.controls) 
        { if($scope.controls[i]) {
          active = i;
        }
  }
      switch(active){
        case 'ban':
          var userID = angular.element($event.currentTarget).data().userid;
          if(isBanned(userID))
            { 
              Conversation.removeBan({id: $scope.conversation[0]._id, banID:userID});
          } else
            { Conversation.addBan({id:$scope.conversation[0]._id, banID:userID})
      }
        break;

        case 'moderator':
          var userID = angular.element($event.currentTarget).data().userid;
          if(isModerator(userID))
            Conversation.removeMod({id:$scope.conversation[0]._id, moderatorID:userID})
          else
            Conversation.addMod({id:$scope.conversation[0]._id, moderatorID:userID})
        break;

        case 'mute':
          var messageID = angular.element($event.currentTarget).data().messageid;
          Conversation.muteMessage({id:$scope.conversation[0]._id, messageID:messageID})
        break;
      }
    }

    function toggleAutoScroll(){
      $scope.autoScroll = !$scope.autoScroll;
    }

    function toggleControls (toggle){
      $scope.controls[toggle] = !$scope.controls[toggle];

      for(var i in $scope.controls) {
        if(i !== toggle) $scope.controls[i] = false;
      }
    }

    function maySend(){
      if(!$scope.conversation || !$scope.conversation[0]) return false;
      if($scope.conversation[0].publicConversation && $scope.user) return true;
      return false;
    }

    function formatDate (dateString){
      var date = new Date(parseInt(dateString, 10)),
          hours = date.getHours().toString().length === 1 ? '0'+date.getHours() : date.getHours(),
          minutes = date.getMinutes().toString().length === 1 ? '0'+date.getMinutes() : date.getMinutes(),
          seconds = date.getSeconds().toString().length === 1 ? '0'+date.getSeconds() : date.getSeconds(),
          format = hours+':'+minutes+':'+seconds;

      return format;
    }

    function muteMessage(){
      Conversation.muteMessage({
        id: $scope.user._id,
        messageID: document.getElementById('cm').value
      });
    }

    function removeBan(){
      Conversation.removeBan({
        id: $scope.user._id,
        banID: document.getElementById('cm').value
      })
    }

    function addBan(){
      Conversation.addBan({
        id: $scope.user._id,
        banID: document.getElementById('cm').value
      })
    }

    function addMod(){
      Conversation.addMod({
        id: $scope.user._id,
        moderatorID: document.getElementById('cm').value
      })
    }

    function removeMod(){
      Conversation.removeMod({
        id: $scope.user._id,
        moderatorID: document.getElementById('cm').value
      })
    }

    function sendMessage(){
      if(document.getElementById('message-input').value.length < 1 || !maySend()) return false;
      
      Conversation.addMessage({
        id: $scope.conversation[0]._id, 
        message: {
          text: document.getElementById('message-input').value
        }
      })

      document.getElementById('message-input').value = '';
    }
  });
