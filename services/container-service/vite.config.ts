import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          globals: true,
          include: ['**/__tests__/**'],
          exclude: [
            '**/__tests__/*.e2e-{test,spec}.ts',
            '**/__tests__/*.integration.{test,spec}.ts',
          ],
          setupFiles: ['**/__tests__/setup.ts', '**/__tests__/setup.unit.ts'],
          testTimeout: 5000,
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'node',
          globals: true,
          include: ['**/__tests__/*.integration.{test,spec}.ts'],
          exclude: [
            '**/__tests__/*.e2e-{test,spec}.ts',
            '**/__tests__/*.{test,spec}.ts',
          ],
          setupFiles: [
            '**/__tests__/setup.ts',
            '**/__tests__/setup.integration.ts',
          ],
          testTimeout: 15000,
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          environment: 'node',
          globals: true,
          include: ['**/__tests__/*.e2e-{test,spec}.ts'],
          exclude: [
            '**/__tests__/*.{test,spec}.ts',
            '**/__tests__/*.integration.{test,spec}.ts',
          ],
          setupFiles: ['**/__tests__/setup.ts', '**/__tests__/setup.e2e.ts'],
          testTimeout: 30000,
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [],
      exclude: [
        'node_modules/**',
        '**/__tests__/**',
        'src/infra/database/prisma/generated/**',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/*.interface.ts',
        '**/*.module.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
