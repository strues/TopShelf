'use strict';

angular.module('topshelf.guild.directives', []);

angular.module('topshelf.guild.states', []);

angular.module('topshelf.guild.filters', []);

angular.module('topshelf.guild.services', []);

angular.module('topshelf.guild.models', []);

angular.module('topshelf.guild', [
  'topshelf.guild.states',
  'topshelf.guild.services',
  'topshelf.guild.filters',
  'topshelf.guild.directives'
]);
