/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('UserCtrl', function () {
  var ctrl;

  beforeEach(module('user'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('UserCtrl');
  }));

  it('should have ctrlName as UserCtrl', function () {
    expect(ctrl.ctrlName).toEqual('UserCtrl');
  });

});
