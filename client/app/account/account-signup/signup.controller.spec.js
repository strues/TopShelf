/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SignupCtrl', function () {
  var ctrl;

  beforeEach(module('user.signup'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('SignupCtrl');
  }));

  it('should have ctrlName as SignupCtrl', function () {
    expect(ctrl.ctrlName).toEqual('SignupCtrl');
  });

});
