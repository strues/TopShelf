import winston from 'winston';
import path from 'path';
import config from '../../config/environment';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: false,
      timestamp: false,
      colorize: true,
      showLevel: true,
      prettyPrint: true
      }),
    new (winston.transports.File)({
      filename: path.join(config.root, 'server', 'logs', 'debug.log'),
      maxsize: 1000000, //1MB
      maxFiles: 3,
      prettyPrint: true
    })
  ],
  exitOnError: false
});

export default logger;
