"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// Declare log directory
let dir = config_1.logDirectory;
if (!dir) {
    dir = path_1.default.resolve('logs');
}
// Check if log directory exists, if doesn't, create one
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
const logLevel = config_1.environtment === 'development' ? 'debug' : 'warn';
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
exports.default = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            level: logLevel,
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.prettyPrint()),
        }),
    ],
    exceptionHandlers: [new winston_daily_rotate_file_1.default(options.file)],
    exitOnError: false,
});
//# sourceMappingURL=Logger.js.map