'use strict';

angular.module('guildApp')
  .controller('InboxCtrl', function ($scope, Inbox, socket) {

  	Inbox
  		.get()
  		.$promise
  		.then(function (inbox) {
	      $scope.inbox = [inbox];
        $scope.box   = $scope.inbox[0].box;

	      socket.syncUpdates('inbox', $scope.inbox);
        console.log(inbox.box.length)
        console.log(inbox)
	    }, function (err){
	    	console.log(err);
	    });


    angular
      .element(document.getElementById('send-message'))
      .on('click', function (){
        var payload = {
          message: document.getElementById('message').value,
          recipientID: document.getElementById('recipient').value
        };

        Inbox
          .message(payload)
          .$promise
          .then(function (res){
            console.log(res)
          }, function (err){
            console.log(err)
          })
      })

    $scope.$on('$destroy', function (){
      socket.unsyncUpdates('inbox');
    })
  });
