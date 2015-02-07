/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('navbar', function () {
  var scope
    , element;

  beforeEach(module('app.admin', 'core/navbar/navbar.tpl.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<navbar></navbar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
