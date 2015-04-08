/* jshint -W079 */
var mockData = (function() {
    return {
        getMockUsers: getMockUsers,
        //getMockApplications: getMockApplications,
        //getMockRecruitment: getMockRecruitment,
        getMockStates: getMockStates,
        laerel: getMockUsers()[0]
    };

    function getMockStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/core/home/home.tpl.html'
                }
            }
        ];
    }

    function getMockUsers() {
        return [
            {
                id: 1017109,
                name: 'Laerel',
                email: 'laerel@topshelfguild.com',
                battletag: 'battletag#1111',
                twitch: 'laerel'
            },
            {
                id: 1017105,
                name: 'Tox',
                email: 'tox@topshelfguild.com',
                battletag: 'tox#1111',
                twitch: 'tox'
            },
            {
                id: 1017108,
                name: 'Soop',
                email: 'soop@topshelfguild.com',
                battletag: 'soop#1111',
                twitch: 'soop'
            }
        ];
    }
})();
