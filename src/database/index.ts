import sequelize from './connection';
import Logger from '../core/Logger';
import './associations';

const isDev = process.env.NODE_ENV === 'development';

export const dbInit = async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Connection to DB success');
    sequelize.sync({ force: true });
  } catch (e) {
    Logger.error('Unable to connect to the database:', e);
  }
};

process.on('SIGINT', async () => {
  // await sequelize.close();
  Logger.info('Database connection disconnected through app termination');
  process.exit(0);
});
