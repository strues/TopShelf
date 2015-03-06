/* jshint -W117, -W030 */
describe('app.core.states', function() {
    describe('state', function() {
        var controller;
        var views = {
            home: 'app/core/core-home/home.tpl.html'
        };

        beforeEach(function() {
            module('app.core.states');
            bard.inject('$location', '$stateProvider', '$rootScope', '$state', '$templateCache');
            $templateCache.put(views.core, '');
        });

        it('should map / to the home view template', function() {
            expect($state.get('home').templateUrl).to.equal(views.home);
        });
    });
});
