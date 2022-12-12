import express from 'express';
import { ForbiddenError } from '../core/ApiError';
import ArchelonConfigRepo from '../database/repository/ArchelonConfigRepo';
import asyncHandler from '../helpers/asyncHandler';
import validator, { ValidationSource } from '../helpers/validator';
import { PublicRequest } from '../types/app-request';
import schema from './schema';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, _res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();

    const apiKey = await ArchelonConfigRepo.checkApiKeyValid(req.apiKey);

    if (apiKey === false) {
      throw new ForbiddenError('Forbidden, API Key not valid');
    }
    return next();
  }),
);
