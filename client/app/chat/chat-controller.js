(function() {
'use strict';
// Socket listeners
// ================
function ChatCtrl($scope, socket) {

  //First, we will create a listener for the 'echo' event that will be emited by our test server:
  socket.on('echo', function (data) {
      $scope.serverResponse = data;
  });

  /*
  We will display $scope.serverResponse later in index.html.
  Now there will also be two functions that will send the data - one using the basic emit() method 
  and one using emit() with acknowledgment callback:
  */
  $scope.emitBasic = function emitBasic() {
        socket.emit('echo', $scope.dataToSend);
        //$scope.dataToSend = '';
    };
 
    $scope.emitACK = function emitACK() {
        socket.emit('echo-ack', $scope.dataToSend, function (data) {
            $scope.serverResponseACK = data;
        });
       //$scope.dataToSend = '';
    };




    socket.on('send:name', function (data) {
      $scope.name = data.name;
      console.log('DATA= '+JSON.stringify(data));   //TEST
    });

    socket.on('send:time', function (data) {
      $scope.time = data.time;
      console.log('DATA time= '+JSON.stringify(data));   //TEST
    });


}
angular
  .module('app')
  .controller('ChatCtrl', ChatCtrl);
})();