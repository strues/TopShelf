'use strict';

describe('Service: navbar', function () {

  // load the service's module
  beforeEach(module('angularFullstackApp'));

  // instantiate service
  var Navbar;
  beforeEach(inject(function (_Navbar_) {
    Navbar = _Navbar_;
  }));

  it('should be collapsed by default', function () {
    expect(Navbar.isCollapsed).toBe(true);
  });

  it('should have a menu array', function() {
    expect(Array.isArray(Navbar.menu)).toBe(true);
  });

  it('should have a menu.length > 0', function() {
    expect(Navbar.menu.length).toBeGreaterThan(0);
  });

  it('should have a "Home" page in the menu', function() {
    expect(Navbar.menu).toContain(jasmine.objectContaining({
      title: 'Home',
      state: 'main'
    }));
  });
});
