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
          include: ['**/*.{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/*.integration.{test,spec}.ts',
            '**/*.e2e-{test,spec}.ts',
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
          include: ['**/*.integration.{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/*.e2e-{test,spec}.ts',
          ],
          setupFiles: ['test/integration/setup.integration.ts'],
          testTimeout: 30000,
          hookTimeout: 60000,
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          environment: 'node',
          globals: true,
          include: ['**/*.e2e-{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/*.integration.{test,spec}.ts',
          ],
          setupFiles: ['test/e2e/setup.e2e.ts'],
          testTimeout: 30000,
          hookTimeout: 60000,
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**'],
      exclude: [
        'node_modules/**',
        '**/types/**',
        '**/interfaces/**',
        '**/contracts/**',
        '**/constants/**',
        'test/**',
        '**.{test,spec}.ts',
        'src/container/infrastructure/persistence/database/prisma/generated/**',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/*.type.ts',
        '**/*.interface.ts',
        '**/*.event.ts',
        '**/*.events.ts',
        '**/*.contract.ts',
        '**/*.module.ts',
        'main.ts',
        'tracing.ts',
        '**/*.dto.ts',
        '**/*.docs.ts',
      ],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
