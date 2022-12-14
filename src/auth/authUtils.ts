import { JwtPayload } from 'jsonwebtoken';
import User from '../database/model/User';
import { tokenInfo } from '../config';
import { AuthFailureError } from '../core/ApiError';
import { Tokens } from '../types/app-request';

export const getAccessToken = (authorization?: string) => {
  if (!authorization) {
    throw new AuthFailureError('Invalid Authorization');
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new AuthFailureError('Invalid Authorization');
  }
  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience
  ) {
    throw new AuthFailureError('Invalid Access Token');
  }
  return true;
};

export const createTokens = async (
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<Tokens> => {};
