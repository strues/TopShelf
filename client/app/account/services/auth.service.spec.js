/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Auth', function () {
  var factory;

  beforeEach(module('user'));

  beforeEach(inject(function (Auth) {
    factory = Auth;
  }));

  it('should have someValue be Auth', function () {
    expect(factory.someValue).toEqual('Auth');
  });

  it('should have someMethod return Auth', function () {
    expect(factory.someMethod()).toEqual('Auth');
  });

});
