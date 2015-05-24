var header = require('gulp-header');
var pkg    = require('../../package.json');

/**
 * The banner.
 */

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.description %>\n' +
  ' * http://github.com/<%= package.homepage %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */\n'
];

/**
 * Export custom header module.
 */

module.exports = function() {
  return header(banner, {
    package: pkg
  });
};
