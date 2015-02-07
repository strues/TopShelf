'use strict';

/**
 * @ngdoc module
 * @name core
 * @description application-wide core features
 */

angular.module('app.core.directives', []);
angular.module('app.core.states', []);
angular.module('app.core.filters', []);
angular.module('app.core.services', []);

angular.module('app.core', [
  'app.core.states',
  'app.core.services',
  'app.core.filters',
  'app.core.directives'
]);
