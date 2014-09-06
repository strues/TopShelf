/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AccountCtrl', function () {
  var ctrl;

  beforeEach(module('account'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AccountCtrl');
  }));

  it('should have ctrlName as AccountCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AccountCtrl');
  });

});
