/* jshint -W079 */
var mockData = (function() {
    return {
        getMockUsers: getMockUsers,
        getMockStates: getMockStates,
        derpAdmin: getMockUsers()[0]
    };

    function getMockStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/core/states/home/home.tpl.html'
                }
            }
        ];
    }

    function getMockUsers() {
        return [
            {
                id: 1017109,
                name: 'Derp',
                battletag: 'Derp#123',
                role: 'Admin',
                email: 'test@test.com'
            },
            {
                id: 1017323,
                name: 'Sloot',
                battletag: 'Sloots#123',
                role: 'User',
                email: 'test@test.net'
            }
        ];
    }
})();
