(function () {
    'use strict';

    function socket (socketFactory) {

      // socket.io now auto-configures its connection when we ommit a connection url
        var ioSocket = io('', { // jshint ignore:line
        // Send auth token on connection, you will need to DI the Auth service above
        // 'query': 'token=' + Auth.getToken()
        path: '/socket.io-client'
      });

        var socket = socketFactory({ // jshint ignore:line
        ioSocket: ioSocket
      });

        var watches = [],
        actions = [];

        var Action = function(modelName, arr, cb) {
            this.array = arr;
            this.cb = cb;
            this.modelName = modelName;

        // Bound Methods
            this.join = angular.bind(this, this.join);
            this.leave = angular.bind(this, this.leave);
            this.save = angular.bind(this, this.save);
            this.remove = angular.bind(this, this.remove);
        };

        Action.prototype = {
        sync: function() {
            socket.on(this.modelName + ':save', this.save);
            socket.on(this.modelName + ':remove', this.remove);
            socket.on('reconnect', this.join);
            return this.join();
        },
        unsync: function() {
            socket.removeListener(this.modelName + ':save', this.save);
            socket.removeListener(this.modelName + ':remove', this.remove);
            socket.removeListener('reconnect', this.join);
            return this.leave();
        },

        join: function() {
            socket.emit('join', this.modelName);
            return this;
        },
        leave: function() {
            socket.emit('leave', this.modelName);
            return this;
        },

        save: function(item) {
            var array = this.array;
            var oldItem = _.find(array, {_id: item._id}); // jshint ignore:line
            var index = array.indexOf(oldItem);
            var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
            if (oldItem) {
                array.splice(index, 1, item);
                event = 'updated';
            } else {
                array.push(item);
            }

            this.cb(event, item, array);
        },
        remove: function(item) {
            var array = this.array;
            var event = 'deleted';
            _.remove(array, {_id: item._id}); // jshint ignore:line
            this.cb(event, item, array);
        }
      };

        return {
        socket: socket,

        /**
         * Register listeners to sync an array with updates on a model
         *
         * Takes the array we want to sync, the model name that socket updates are sent from,
         * and an optional callback function after new items are updated.
         *
         * @param {String} modelName
         * @param {Array} array
         * @param {Function} cb
         */
        syncUpdates: function (modelName, array, cb) {
            cb = cb || angular.noop;

            watches.push(array);
            actions.push(new Action(modelName, array, cb).sync());

        },
        unsyncUpdates: function (array) {
            var index = watches.indexOf(array);
            if (index >= 0) {
                watches.splice(index, 1);
                actions.splice(index, 1)[0].unsync();
            }
        }
      };
    }

    angular
        .module('topshelf.core')
        .factory('socket', socket);
})();
