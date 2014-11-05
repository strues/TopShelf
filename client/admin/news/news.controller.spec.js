/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('NewsCtrl', function () {
  var ctrl;

  beforeEach(module('admin.news'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NewsCtrl');
  }));

  it('should have ctrlName as NewsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NewsCtrl');
  });

});
