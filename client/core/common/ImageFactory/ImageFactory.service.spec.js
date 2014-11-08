'use strict';

describe('Service: ImageFactory', function () {

  // load the service's module
  beforeEach(module('topshelf.core'));

  // instantiate service
  var ImageFactory;
  beforeEach(inject(function (_ImageFactory_) {
    ImageFactory = _ImageFactory_;
  }));

  it('should do something', function () {
    expect(!!ImageFactory).toBe(true);
  });

});
