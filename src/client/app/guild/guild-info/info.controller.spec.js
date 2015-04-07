/*global describe, beforeEach, it, expect, inject, module*/
'use strict';
describe('GuildInfoController', function () {
  var ctrl;
  beforeEach(module('ui.router'));
  beforeEach(module('app.guild'));
  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('GuildInfoController');
  }));
  it('should have ctrlName as GuildInfoController', function () {
    expect(ctrl.ctrlName).to.equal('GuildInfoController');
  });
});