/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('loginForm', function () {
  var scope
    , element;

  beforeEach(module('topshelf.user', 'user/login/loginForm.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<login-form></login-form>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$digest();
    expect(element.isolateScope().loginForm.name).toEqual('loginForm');
  });

});
