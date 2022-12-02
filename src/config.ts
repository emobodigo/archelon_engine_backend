import { Dialect } from 'sequelize';

// Environtment variables
export const environtment = process.env.NODE_ENV;
export const port = process.env.PORT;

// CORS
export const corsURL = process.env.CORS_URL;

// Tokens
export const tokenInfo = {
  accessTokenValidityMin: parseInt(process.env.ACCESS_TOKEN_VALIDITY_MIN || '30'),
  refreshTokenValiditySec: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '120'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

// Log Directory
export const logDirectory = process.env.LOG_DIR;

// DB
export const dbName = process.env.DB_NAME as string;
export const dbHost = process.env.DB_HOST || 'localhost';
export const dbPort = process.env.DB_PORT || '3306';
export const dbUser = process.env.DB_USER as string;
export const dbPassword = process.env.DB_PASSWORD || '';
export const dbDriver = process.env.DB_DRIVER as Dialect;
