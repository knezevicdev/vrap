export enum Groups {
  LogisticsPortal = 'LogisticsPortal',
  LogisticsPortalAdmin = 'LogisticsPortalAdmin',
  LogisticsPortalPending = 'LogisticsPortalPending',
  LogisticsPortalRejected = 'LogisticsPortalRejected',
}

export interface Tokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface AccessToken {
  sub: string;
  'cognito:groups': string[];
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  username: string;
}

export interface IdToken {
  sub: string;
  'cognito:groups': string[];
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  'cognito:roles': string[];
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  name: string;
  exp: number;
  iat: number;
  email: string;
}
