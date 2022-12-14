import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { BadRequestError } from '../core/ApiError';
import Logger from '../core/Logger';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value: string, helpers) => {
    if (value.includes('://')) {
      return helpers.error('any.invalid');
    }
  }, 'Url Endpoint Validation');

export const JoiAuthBearer = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) {
      return helpers.error('any.invalid');
    }
    if (!value.split(' ')[1]) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Authorization Header Validation');

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) {
        return next();
      }

      const { details } = error;
      const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
      Logger.error(message);

      next(new BadRequestError(message));
    } catch (e) {
      next(e);
    }
  };
