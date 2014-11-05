/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('InfoCtrl', function () {
  var ctrl;

  beforeEach(module('topshelf.guild'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('InfoCtrl');
  }));

  it('should have ctrlName as InfoCtrl', function () {
    expect(ctrl.ctrlName).toEqual('InfoCtrl');
  });

});
