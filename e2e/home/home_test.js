/*global describe, beforeEach, it, browser, expect */
'use strict';

describe('Home page', function () {
  var homePage = require('./home.po');

  beforeEach(function () {
    browser.get('http://localhost:3000/#/home');
  });

  it('should say HomeCtrl', function () {
    expect(homePage.heading.getText()).toEqual('home');
    expect(homePage.text.getText()).toEqual('HomeCtrl');
  });
});
