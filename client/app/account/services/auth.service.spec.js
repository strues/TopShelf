/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Authentication', function () {
  var factory;

  beforeEach(module('user'));

  beforeEach(inject(function (Authentication) {
    factory = Authentication;
  }));

  it('should have someValue be Authentication', function () {
    expect(factory.someValue).toEqual('Authentication');
  });

  it('should have someMethod return Authentication', function () {
    expect(factory.someMethod()).toEqual('Authentication');
  });

});
