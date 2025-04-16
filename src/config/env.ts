export const API_URL = import.meta.env.VITE_API_URL || '/api';
export const NODE_ENV = import.meta.env.NODE_ENV || 'development';
export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = NODE_ENV === 'development';

export const env = {
  API_URL: API_URL,
  NODE_ENV: NODE_ENV,
  AUTH_TOKEN_KEY: 'auth_token',
};

export type Env = typeof env; 