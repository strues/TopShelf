/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ApplicationRepository', function () {
  var factory;

  beforeEach(module('account'));

  beforeEach(inject(function (ApplicationRepository) {
    factory = ApplicationRepository;
  }));

  it('should have someValue be ApplicationRepository', function () {
    expect(factory.someValue).toEqual('ApplicationRepository');
  });

  it('should have someMethod return ApplicationRepository', function () {
    expect(factory.someMethod()).toEqual('ApplicationRepository');
  });

});
