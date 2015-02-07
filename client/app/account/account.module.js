'use strict';

angular.module('app.account.directives', []);

angular.module('app.account.states', []);

angular.module('app.account.services', []);

angular.module('app.account', [
  'app.account.states',
  'app.account.services',
  'app.account.directives'
]);
