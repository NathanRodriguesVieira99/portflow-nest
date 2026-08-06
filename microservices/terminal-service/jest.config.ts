import type { Config } from 'jest';

const projectConfig: Config = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@Types/(.*)$': '<rootDir>/src/terminal/@types/$1',
    '^@Contracts/(.*)$': '<rootDir>/src/terminal/domain/contracts/$1',
    '^@Events/(.*)$':
      '<rootDir>/src/terminal/infrastructure/messaging/events/$1',
    '^@Models/(.*)$': '<rootDir>/src/terminal/domain/models/$1',
    '^@Repositories/(.*)$':
      '<rootDir>/src/terminal/infrastructure/persistence/repositories/$1',
    '^@Controllers/(.*)$': '<rootDir>/src/terminal/presentation/controllers/$1',
    '^@Dtos/(.*)$': '<rootDir>/src/terminal/presentation/dtos/$1',
    '^@Services/(.*)$': '<rootDir>/src/terminal/application/services/$1',
    '^@Infra/(.*)$': '<rootDir>/src/terminal/infrastructure/$1',
    '^@Shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};

const config: Config = {
  ...projectConfig,
  projects: [
    {
      displayName: 'unit',
      ...projectConfig,
      testMatch: ['<rootDir>/**/*.{test,spec}.ts'],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '\\.integration\\.(test|spec)\\.ts$',
        '\\.e2e-(test|spec)\\.ts$',
      ],
      setupFilesAfterEnv: ['<rootDir>/test/unit/setup.unit.ts'],
      testTimeout: 5000,
    },
    {
      displayName: 'integration',
      ...projectConfig,
      testMatch: ['<rootDir>/**/*.integration.{test,spec}.ts'],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '(?<!\\.integration)\\.(test|spec)\\.ts$',
        '\\.e2e-(test|spec)\\.ts$',
      ],
      setupFilesAfterEnv: ['<rootDir>/test/integration/setup.integration.ts'],
      testTimeout: 30000,
    },
    {
      displayName: 'e2e',
      ...projectConfig,
      testMatch: ['<rootDir>/**/*.e2e-{test,spec}.ts'],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '\\.integration\\.(test|spec)\\.ts$',
      ],
      setupFilesAfterEnv: ['<rootDir>/test/e2e/setup.e2e.ts'],
      testTimeout: 30000,
    },
  ],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'json', 'html', 'lcov'],
  collectCoverageFrom: [
    'src/**',
    '!node_modules/**',
    '!**/types/**',
    '!**/interfaces/**',
    '!**/contracts/**',
    '!**/constants/**',
    '!test/**',
    '!**.{test,spec}.ts',
    '!src/container/infrastructure/persistence/database/prisma/generated/**',
    '!**/*.d.ts',
    '!**/*.types.ts',
    '!**/*.type.ts',
    '!**/*.interface.ts',
    '!**/*.event.ts',
    '!**/*.events.ts',
    '!**/*.contract.ts',
    '!**/*.module.ts',
    '!main.ts',
    '!tracing.ts',
    '!**/*.dto.ts',
    '!**/*.docs.ts',
  ],
};

export default config;
