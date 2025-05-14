import 'dotenv/config';

export const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  
  return value || '';
};

export const ANTHROPIC_API_KEY = getEnvVariable('ANTHROPIC_API_KEY', '');

export const ANTHROPIC_MODEL = getEnvVariable('ANTHROPIC_MODEL', 'claude-3-5-sonnet-latest');

export const NODE_ENV = getEnvVariable('NODE_ENV', 'development');
export const IS_DEVELOPMENT = NODE_ENV === 'development'; 