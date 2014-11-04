'use strict';

describe('Service: authInterceptor', function () {

  beforeEach(module('app'));

  var authInterceptor;
  beforeEach(inject(function (_authInterceptor_) {
    authInterceptor = _authInterceptor_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
