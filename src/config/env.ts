export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  AUTH_TOKEN_KEY: 'auth_token',
};

export type Env = typeof env; 