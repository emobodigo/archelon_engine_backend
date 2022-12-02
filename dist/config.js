"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDirectory = exports.tokenInfo = exports.corsURL = exports.port = exports.environtment = void 0;
// Environtment variables
exports.environtment = process.env.NODE_ENV;
exports.port = process.env.PORT;
// CORS
exports.corsURL = process.env.CORS_URL;
// Tokens
exports.tokenInfo = {
    accessTokenValidityMin: parseInt(process.env.ACCESS_TOKEN_VALIDITY_MIN || '30'),
    refreshTokenValiditySec: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '120'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};
// Log Directory
exports.logDirectory = process.env.LOG_DIR;
//# sourceMappingURL=config.js.map