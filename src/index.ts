import app from './app';
import { port } from './config';
import Logger from './core/Logger';
import { dbInit } from './database';

dbInit();
app
  .listen(port, () => {
    Logger.info(`Server running on port: ${port}`);
  })
  .on('error', (e) => Logger.error(e));
