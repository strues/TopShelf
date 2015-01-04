'use strict';

angular.module('topshelf.account.directives', []);

angular.module('topshelf.account.states', []);

angular.module('topshelf.account.services', []);

angular.module('topshelf.account', [
  'topshelf.account.states',
  'topshelf.account.services',
  'topshelf.account.directives'
]);
