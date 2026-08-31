/*
 * Arquivo Responsável por subir toda infra dos testes de integração via testcontainers.
 * Esse arquivo não derruba os containers após os testes pois facilita rodar os testes novamente, sendo necessário derrubar os containers manualmente após testar.
 * Esse arquivo roda as migrations do Prisma ORM uma vez antes dos testes, ou seja, 'popula' o banco de dados PostgreSQL.
 * Esse arquivo sobrescreve as variáveis de ambiente padrão para usar as do ambiente do testcontainers.
 */

import { execSync } from 'node:child_process';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';

let startedPostgreSqlContainer: StartedPostgreSqlContainer;
let startedKafkaContainer: StartedKafkaContainer;

export default async function globalSetup() {
  startedPostgreSqlContainer = await new PostgreSqlContainer(
    'postgres:18-alpine',
  )
    .withExposedPorts(5432)
    .withDatabase('container_service_test_db')
    .withUsername('admin')
    .withPassword('admin')
    .withReuse()
    .start();

  const postgresqlUri = startedPostgreSqlContainer.getConnectionUri();
  process.env.DATABASE_URL = postgresqlUri;

  execSync('pnpm db:migrate:deploy', { env: process.env });

  startedKafkaContainer = await new KafkaContainer(
    'confluentinc/cp-kafka:7.8.0',
  )
    .withKraft()
    .withReuse()
    .start();

  const brokers = [
    `${startedKafkaContainer.getHost()}:${startedKafkaContainer.getMappedPort(9093)}`,
  ];
  process.env.KAFKA_BROKERS = brokers.join(',');
}
