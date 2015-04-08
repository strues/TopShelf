/* jshint -W117, -W030 */
describe('app.account', function() {
    var controller;
    var users = mockData.getMockUsers();
    var id = mockData.laerel.id;

    beforeEach(function() {
        bard.appModule('app.account');
        bard.inject(this, '$controller', 'Auth', 'bard.fake$location', 'bard.fake$window', 'bard.fakeToastr', 'bard.fake$stateProvider');
    });

    beforeEach(function() {
        sinon.stub(dataservice, 'getUser')
            .returns($q.when(mockData.laerel))
            .withArgs(id);
        controller = $controller('LoginController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('LoginController', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });


    });
});
