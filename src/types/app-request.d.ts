import { Request } from 'express';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface AdminRequest extends PublicRequest {
  accessToken: string;
  currentRole: number;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
