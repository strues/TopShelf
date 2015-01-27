'use strict';

/**
 * @ngdoc module
 * @name core
 * @description application-wide core features
 */

angular.module('topshelf.core.directives', []);
angular.module('topshelf.core.states', []);
angular.module('topshelf.core.filters', []);
angular.module('topshelf.core.services', []);

angular.module('topshelf.core', [
  'topshelf.core.states',
  'topshelf.core.services',
  'topshelf.core.filters',
  'topshelf.core.directives'
]);
