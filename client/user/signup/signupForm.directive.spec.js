'use strict';

describe('Directive: signupForm', function () {

  beforeEach(module('topshelf.user'));
  beforeEach(module('user/signup/signupForm.tpl.html'));

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
