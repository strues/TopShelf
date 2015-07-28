/**
 * @author    Steve Truesdell {@link https://stues.co}
 * @copyright Copyright (c) 2015, Steve Truesdell
 * @license   GPL-3.0
 */

// this will automatically compile gulp tasks files on the fly from ES6 to ES5
require('babel/register');

// require all tasks
require('require-dir')('./gulp/tasks', { recurse: true });
