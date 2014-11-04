'use strict';

describe('Directive: highlightActive', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/highlightactive/highlightactive.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<highlight-active></highlight-active>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
