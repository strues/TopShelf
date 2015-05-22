/**
 * Files injected into index.html by gulp-inject
 * used by tasks inject & watch
 */

module.exports = [
  'src/client/app/app.module.js',
  'src/client/app/**/*.module.js',
  'src/client/app/**/*.config.js',
  'src/client/app/**/*.directive.js', '!src/client/app/**/*.directive.spec.js',
  'src/client/app/**/*.service.js', '!src/client/app/**/*.service.spec.js',
  'src/client/app/**/*.controller.js', '!src/client/app/**/*.controller.spec.js',
  'src/client/app/**/*.js',
  '.tmp/style.css',
  '.tmp/templates.js'
];
