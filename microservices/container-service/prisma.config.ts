import { loadEnvFile } from 'node:process';
import { defineConfig } from 'prisma/config';

loadEnvFile('.env');

export default defineConfig({
  schema: 'src/external/persistence/database/prisma',
  migrations: {
    path: 'src/external/persistence/database/migrations',
    seed: 'tsx ./src/external/persistence/database/prisma/seeds/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
