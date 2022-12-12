import sequelize from './connection';
import Logger from '../core/Logger';
import ArchelonConfig from './model/ArchelonConfig';

const isDev = process.env.NODE_ENV === 'development';

export const dbInit = async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Connection to DB success');
    await ArchelonConfig.sync({ alter: isDev });
  } catch (e) {
    Logger.error('Unable to connect to the database:', e);
  }
};

process.on('SIGINT', async () => {
  await sequelize.close();
  Logger.info('Database connection disconnected through app termination');
  process.exit(0);
});
