/*global describe, beforeEach, it, expect, inject, module*/
'use strict';
describe('GuildInfoCtrl', function () {
    var ctrl;
    beforeEach(module('ui.router'));
    beforeEach(module('app.guild'));
    beforeEach(inject(function ($rootScope, $controller) {
        ctrl = $controller('GuildInfoCtrl');
    }));
    it('should have ctrlName as GuildInfoCtrl', function () {
        expect(ctrl.ctrlName).to.equal('GuildInfoCtrl');
    });
});
