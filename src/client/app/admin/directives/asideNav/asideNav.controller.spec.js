/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AsideNavCtrl', function() {
    var ctrl;

    beforeEach(module('app.admin.directives'));

    beforeEach(inject(function($rootScope, $controller) {
        ctrl = $controller('AsideNavCtrl');
    }));

    it('should have ctrlName as AsideNavCtrl', function() {
        expect(ctrl.ctrlName).toEqual('AsideNavCtrl');
    });

});
