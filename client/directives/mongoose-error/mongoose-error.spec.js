'use strict';

describe('Directive: mongooseError', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/mongoose-error/mongoose-error.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<mongoose-error></mongoose-error>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
