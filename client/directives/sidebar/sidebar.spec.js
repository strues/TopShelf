'use strict';

describe('Directive: sidebar', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/sidebar/sidebar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<sidebar></sidebar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
