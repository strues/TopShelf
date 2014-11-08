'use strict';

describe('Directive: thumbPreview', function () {

  // load the directive's module
  beforeEach(module('topshelf.core'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<thumb-preview></thumb-preview>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the thumbPreview directive');
  }));
});
