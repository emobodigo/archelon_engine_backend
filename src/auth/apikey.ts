import express from 'express';
import { ForbiddenError } from 'src/core/ApiError';
import ArchelonConfigRepo from 'src/database/repository/ArchelonConfigRepo';
import asyncHandler from 'src/helpers/asyncHandler';
import validator, { ValidationSource } from 'src/helpers/validator';
import { PublicRequest } from 'src/types/app-request';
import schema from './schema';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key']?.toString();

    const apiKey = await ArchelonConfigRepo.checkApiKeyValid(req.apiKey);
    if (apiKey === false) {
      throw new ForbiddenError('Forbidden, API Key not valid');
    }
    return next();
  }),
);
