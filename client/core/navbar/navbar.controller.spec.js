/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('NavbarCtrl', function () {
  var ctrl;

  beforeEach(module('topshelf.core'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NavbarCtrl');
  }));

  it('should have ctrlName as NavbarCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NavbarCtrl');
  });

});
