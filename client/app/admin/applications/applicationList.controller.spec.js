/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ApplicationListCtrl', function () {
  var ctrl;

  beforeEach(module('admin.recruitment'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ApplicationListCtrl');
  }));

  it('should have ctrlName as ApplicationListCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ApplicationListCtrl');
  });

});
