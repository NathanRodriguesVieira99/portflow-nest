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
          include: ['src/**/__tests__/*.{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'src/**/__tests__/*.e2e-{test,spec}.ts',
            'src/**/__tests__/*.integration.{test,spec}.ts',
          ],
          setupFiles: ['src/__tests__/setup.unit.ts'],
          testTimeout: 5000,
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'node',
          globals: true,
          include: ['src/**/__tests__/*.integration.{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/__tests__/*.e2e-{test,spec}.ts',
            '**/__tests__/*.{test,spec}.ts',
          ],
          setupFiles: ['src/__tests__/setup.integration.ts'],
          testTimeout: 15000,
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          environment: 'node',
          globals: true,
          include: ['src/**/__tests__/*.e2e-{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/__tests__/*.{test,spec}.ts',
            '**/__tests__/*.integration.{test,spec}.ts',
          ],
          setupFiles: ['src/__tests__/setup.e2e.ts'],
          testTimeout: 30000,
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**'],
      exclude: [
        'node_modules/**',
        '**/__tests__/**',
        'src/infrastructure/database/prisma/generated/**',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/*.interface.ts',
        '**/*.contract.ts',
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
