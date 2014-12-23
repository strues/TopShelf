/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('User', function () {
  var factory;

  beforeEach(module('user'));

  beforeEach(inject(function (User) {
    factory = User;
  }));

  it('should have someValue be User', function () {
    expect(factory.someValue).toEqual('User');
  });

  it('should have someMethod return User', function () {
    expect(factory.someMethod()).toEqual('User');
  });

});
