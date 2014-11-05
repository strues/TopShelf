/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SettingsCtrl', function () {
  var ctrl;

  beforeEach(module('topshelf.user'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('SettingsCtrl');
  }));

  it('should have ctrlName as SettingsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('SettingsCtrl');
  });

});
