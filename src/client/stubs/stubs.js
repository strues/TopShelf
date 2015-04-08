(function () {
    angular
        .module('app')
        .factory('stubs', stubs);

    stubs.$inject = ['$httpBackend'];
    /* @ngInject */
    function stubs($httpBackend) {
        var apiUrl = new RegExp(/api\//);
        var service = {
            registerAll: registerAll,
            registerGetUser: registerGetUser,
            registerGetUsers: registerGetUsers
        };

        return service;

        function registerAll() {
            registerGetUsers();
            registerGetUser();
        }

        function registerGetUsers() {
            var pattern = new RegExp(apiUrl.source + 'customers');
            $httpBackend.whenGET(pattern).respond(getUsersCallback);

            function getUsersCallback(method, url, data) {
                var customers = [
                    {
                        'id': 8349812,
                        'firstName': 'Madalana',
                        'lastName': '',
                        'city': 'Wickedia',
                        'state': 'UK',
                        'zip': '81239',
                        'thumbnail': 'colleen_papa.jpg'
                    },
                    {
                        'id': 2387872,
                        'firstName': 'Galavant',
                        'lastName': '',
                        'city': 'Medievalia',
                        'state': 'UK',
                        'zip': '82828',
                        'thumbnail': 'john_papa.jpg'
                    }];
                return [200, users, {}];
            }
        }

        function registerGetUser(id) {
            var pattern = new RegExp(apiUrl.source + /user\/\**/.source);
            $httpBackend.whenGET(pattern).respond(getUserCallback);

            function getUserCallback(method, url, data) {
                var customer = {
                    'id': 8349812,
                    'firstName': 'Madalana',
                    'lastName': '',
                    'city': 'Wickedia',
                    'state': 'UK',
                    'zip': '81239',
                    'thumbnail': 'colleen_papa.jpg'
                };
                return [200, user, {}];
            }
        }
    }
})();
