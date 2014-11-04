'use strict';

describe('Directive: toggleMinNav', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/toggleminnav/toggleminnav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<toggle-min-nav></toggle-min-nav>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
