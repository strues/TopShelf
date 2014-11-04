'use strict';

describe('Directive: toggleOffCanvas', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/toggleoffcanvas/toggleoffcanvas.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<toggle-off-canvas></toggle-off-canvas>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
