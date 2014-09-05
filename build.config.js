/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
	/**
	 * The `build_dir` folder is where our projects are compiled during
	 * development and the `compile_dir` folder is where our app resides once it's
	 * completely built.
	 */
	build_dir: 'build',
	prod_dir: 'prod',
	compile_dir: 'bin',

	/**
	 * This is a collection of file patterns that refer to our app code (the
	 * stuff in `src/`). These file paths are used in the configuration of
	 * build tasks. `js` is all project javascript, less tests. `ctpl` contains
	 * our reusable components' (`src/common`) template HTML files, while
	 * `atpl` contains the same, but for our app's code. `html` is just our
	 * main HTML file, `less` is our main stylesheet, and `unit` contains our
	 * app's unit tests.
	 */
	app_files: {
		js: [ 'client/app/**/*.js', '!client/app/**/*.spec.js', '!client/assets/**/*.js' ],
		jsunit: [ 'client/app/**/*.spec.js' ],

		atpl: [ 'client/app/**/*.tpl.html' ],
		ctpl: [ 'client/app/common/**/*.tpl.html' ],

		html: [ 'client/index.html' ],
		scss: ['client/styles/app.scss']
	},

	/**
	 * This is a collection of files used during testing only.
	 */
	test_files: {
		js: [
			'client/vendor/angular-mocks/angular-mocks.js'
		]
	},

	/**
	 * This is the same as `app_files`, except it contains patterns that
	 * reference vendor code (`vendor/`) that we need to place into the build
	 * process somewhere. While the `app_files` property ensures all
	 * standardized files are collected for compilation, it is the user's job
	 * to ensure non-standardized (i.e. vendor-related) files are handled
	 * appropriately in `vendor_files.js`.
	 *
	 * The `vendor_files.js` property holds files to be automatically
	 * concatenated and minified with our project source files.
	 *
	 * The `vendor_files.css` property holds any CSS files to be automatically
	 * included in our app.
	 *
	 * The `vendor_files.assets` property holds any assets to be copied along
	 * with our app's assets. This structure is flattened, so it is not
	 * recommended that you use wildcards.
	 */
	vendor_files: {
		js: [
			'client/vendor/angular/angular.js',
			'client/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'client/vendor/angular-ui-router/release/angular-ui-router.js',
			'client/vendor/angular-breadcrumb/dist/angular-breadcrumb.js',
			'client/vendor/angular-resource/angular-resource.min.js',
			'client/vendor/angular-animate/angular-animate.min.js',
			'client/vendor/angular-growl/build/angular-growl.js',
			'client/vendor/angular-cookies/angular-cookies.js',
			'client/vendor/angular-form-for/dist/form-for.js',
			'client/vendor/angular-messages/angular-messages.js',
			'client/vendor/angular-retina/dist/angular-retina.js',
			'client/vendor/jquery/dist/jquery.js',
			'client/vendor/lodash/dist/lodash.compat.js',
			'client/vendor/restangular/dist/restangular.js',
			'client/vendor/modernizr/modernizr.js',
			'client/vendor/angular-ui-utils/modules/route/route.js'
		],
		css: [
		],
		assets: [
		]
	}
};
