import 'dotenv/config';

import * as z from 'zod';
import { Logger } from '@nestjs/common';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  PORT: z.coerce.number(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  if (process.env.NODE_ENV === 'development') {
    Logger.error(
      'Error on validate environment variables!',
      z.treeifyError(_env.error),
    );
  }
  throw new Error('Invalid environment variables!');
}

export const env = _env.data;
