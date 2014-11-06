'use strict';

describe('Directive: mongooseError', function () {

  beforeEach(module('topshelf.core'));
  beforeEach(module('core/mongoose-error.html'));

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
