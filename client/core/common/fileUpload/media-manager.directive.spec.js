'use strict';

describe('Directive: mediaManager', function () {

  // load the directive's module and view
  beforeEach(module('topshelf.core'));
  beforeEach(module('core/common/fileUpload/media-manager.tpl.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<media-manager></media-manager>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mediaManager directive');
  }));
});
