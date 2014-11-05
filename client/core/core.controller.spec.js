/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CoreCtrl', function () {
  var ctrl;

  beforeEach(module('core'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CoreCtrl');
  }));

  it('should have ctrlName as CoreCtrl', function () {
    expect(ctrl.ctrlName).toEqual('CoreCtrl');
  });

});
