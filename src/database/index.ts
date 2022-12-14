import sequelize from './connection';
import Logger from '../core/Logger';
import User from './model/User';
import UserRole from './model/UserRole';
import UserStatus from './model/UserStatus';
import UserAction from './model/UserAction';
import ArchelonConfig from './model/ArchelonConfig';
import UserActivityLog from './model/UserActivityLog';

const isDev = process.env.NODE_ENV === 'development';

export const dbInit = async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Connection to DB success');
    await ArchelonConfig.sync({ alter: isDev });
    await UserRole.sync({ alter: isDev });
    await UserStatus.sync({ alter: isDev });
    await UserAction.sync({ alter: isDev });
    await User.sync({ alter: isDev });
    await UserActivityLog.sync({ alter: isDev });
  } catch (e) {
    Logger.error('Unable to connect to the database:', e);
  }
};

process.on('SIGINT', async () => {
  // await sequelize.close();
  Logger.info('Database connection disconnected through app termination');
  process.exit(0);
});
