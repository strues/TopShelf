/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AsideNavCtrl', function() {
    var scope, element;

    beforeEach(module('app.admin.directives', 'app/admin/directives/asideNav/asideNav.tpl.html'));

    var element, scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

});
