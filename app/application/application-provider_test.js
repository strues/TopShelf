/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Application', function () {
  var provider;

  beforeEach(module('account'));

  beforeEach(inject(function (Application) {
    provider = Application;
  }));

  it('should equal Application', function () {
    expect(provider).toEqual('Application');
  });

});
