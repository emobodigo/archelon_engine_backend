import express, { Request, Response, NextFunction, Application } from 'express';
import Logger from './core/Logger';
import cors from 'cors';
import { corsURL, environtment } from './config';
import routesV1 from './routes/v1';
import { ApiError, InternalError, NotFoundError } from './core/ApiError';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app: Application = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsURL, optionsSuccessStatus: 200 }));

// Routes
app.use('/api/v1', routesV1);

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(new NotFoundError()));

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environtment === 'development') {
      Logger.error(err);
      console.log(err);

      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
