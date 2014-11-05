/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ApplicationCtrl', function () {
  var ctrl;

  beforeEach(module('guild.recruitment'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ApplicationCtrl');
  }));

  it('should have ctrlName as ApplicationCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ApplicationCtrl');
  });

});
