'use strict';

describe('Service: socket', function () {

  beforeEach(module('app'));

  var socket;
  beforeEach(inject(function (_socket_) {
    socket = _socket_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
