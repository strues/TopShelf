'use strict';

describe('Directive: signupform', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/signupform/signupform.html'));

    var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<signup-form></signup-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signupForm directive');
  }));
});
