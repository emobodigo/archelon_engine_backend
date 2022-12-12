import { Sequelize } from 'sequelize';
import { dbDriver, dbHost, dbName, dbPassword, dbUser } from '../config';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

export default sequelize;
