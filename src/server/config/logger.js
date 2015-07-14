import fs from 'fs';
let config = require('./environment');

/**
 * Module init function.
 */
module.exports = {

  getLogFormat: function() {
    return config.log.format;
  },

  getLogOptions: function() {
    let options = {};

    try {
      if ('stream' in config.log.options) {
        options = {
          stream: fs.createWriteStream(process.cwd() + '/' +
          config.log.options.stream, {
            flags: 'a'
          })
        };
      }
    } catch (e) {
      options = {};
    }

    return options;
  }

};
