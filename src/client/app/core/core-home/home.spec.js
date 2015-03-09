'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('app.core.states'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('contain a carousel', inject(function($controller) {
    expect(carousel.slides).toBeUndefined();

    $controller('HomeCtrl', {
      $scope: scope
    });

    expect(angular.isArray(scope.slides)).toBeTruthy();
    expect(scope.slides.length > 1).toBeTruthy();
  }));
});
