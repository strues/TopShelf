/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('GuildCtrl', function () {
  var ctrl;

  beforeEach(module('topshelf.guild'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('GuildCtrl');
  }));

  it('should have ctrlName as GuildCtrl', function () {
    expect(ctrl.ctrlName).toEqual('GuildCtrl');
  });

});
