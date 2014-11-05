/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('RecruitmentCtrl', function () {
  var ctrl;

  beforeEach(module('topshelf.guild'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RecruitmentCtrl');
  }));

  it('should have ctrlName as RecruitmentCtrl', function () {
    expect(ctrl.ctrlName).toEqual('RecruitmentCtrl');
  });

});
