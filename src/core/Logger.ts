import path from 'path';
import { environtment, logDirectory } from '../config';
import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Declare log directory
let dir = logDirectory;
if (!dir) {
  dir = path.resolve('logs');
}

// Check if log directory exists, if doesn't, create one
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = environtment === 'development' ? 'debug' : 'warn';

const options = {
  file: {
    level: logLevel,
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorSize: true,
    maxFiles: '14d',
  },
};

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false,
});
