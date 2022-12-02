import { Sequelize } from 'sequelize';
import { dbDriver, dbHost, dbName, dbPassword, dbUser } from 'src/config';
import ArchelonConfig from './model/ArchelonConfig';

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

const isDev = process.env.NODE_ENV === 'development';

export const dbInit = () => {
  ArchelonConfig.sync({ alter: isDev });
};
