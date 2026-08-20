# Portflow

## Sobre

Sistema de gestão portuária baseado em microsserviços com NestJS, mensageria via Kafka e observabilidade.

A comunicação combina REST APIs (síncrona) e eventos Kafka (assíncrona).

## Microservices

### container-service

Serviço responsável pela gestão de contêineres.

#### Tech Stack

| Tecnologia                                                                                                              |                                                      |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **[NodeJS](https://nodejs.org/docs/latest/api/)**                                                                       | Runtime JavaScript                                   |
| **[TypeScript](https://www.typescriptlang.org/docs/)**                                                                  | Tipagem estática                                     |
| **[NestJS](https://docs.nestjs.com/)**                                                                                  | Framework NodeJs                                     |
| **[Prisma](https://www.prisma.io/docs/)**                                                                               | ORM                                                  |
| **[kafkaJS](https://kafka.js.org/docs/)** + **[`@nestjs/microservices`](https://docs.nestjs.com/microservices/basics)** | Mensageria assíncrona                                |
| **[Redis](https://redis.io/docs/)**                                                                                     | Cache                                                |
| **[OpenTelemetry](https://opentelemetry.io/docs/)**                                                                     | Tracing distribuído ponta a ponta                    |
| **[Pino](https://getpino.io/#/)**                                                                                       | Logging estruturado com transporte para Loki         |
| **[Prometheus](https://prometheus.io/docs/)**                                                                           | Coleta de métricas                                   |
| **[nestjs-cls](https://papooch.github.io/nestjs-cls/)**                                                                 | Context Propagation para Correlation ID              |
| **[Zod](https://zod.dev/)**                                                                                             | Validação de variáveis de ambiente em runtime        |
| **[Cockatiel](https://cockatiel.app/)**                                                                                 | Resiliência com Circuit Breaker e Fallback           |
| **[Axios](https://axios-http.com/docs/intro)**                                                                          | HTTP Client                                          |
| **[Vitest](https://vitest.dev/guide/)**                                                                                 | Test runner                                          |
| **[Testcontainers](https://node.testcontainers.org/)**                                                                  | Infra real em Docker para testes de integração e e2e |
| **[Sinon](https://sinonjs.org/)**                                                                                       | Mocks, stubs e spies para testes unitários           |
| **[Nock](https://github.com/nock/nock)**                                                                                | Mock de HTTP para testes unitários                   |
| **[Supertest](https://github.com/ladjs/supertest)**                                                                     | Assertions HTTP para testes e2e                      |
| **[SWC](https://swc.rs/docs/)**                                                                                         | Compilação rápida                                    |

#### Endpoints

| Método   | Rota                                           | Parâmetros                                                                                         |
| -------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `GET`    | `api/v1/health`                                | —                                                                                                  |
| `POST`   | `api/v1/containers/arrivals`                   | `containerId`, `shipId`, `terminalId`, `originCountry`, `destinationCountry`, `cargoType` _(body)_ |
| `GET`    | `api/v1/containers`                            | `page`, `perPage` _(query)_                                                                        |
| `GET`    | `api/v1/containers/by-status`                  | `status`, `page`, `perPage` _(query)_                                                              |
| `GET`    | `api/v1/containers/:containerId`               | `containerId` _(path)_                                                                             |
| `PUT`    | `api/v1/containers/:containerId/update-status` | `containerId` _(path)_, `newStatus` _(body)_                                                       |
| `DELETE` | `api/v1/containers/:containerId`               | `containerId` _(path)_                                                                             |

#### Kafka Events

| Tópico                                      | Producer          | Consumer          | Consumer Group            |
| ------------------------------------------- | ----------------- | ----------------- | ------------------------- |
| `portflow.container.pending_documentation`  | container-service | —                 | —                         |
| `portflow.container.documentation_released` | —                 | container-service | `container-service-group` |
| `portflow.container.documentation_refused`  | —                 | container-service | `container-service-group` |

### terminal-service

Serviço responsável pela gestão de terminais portuários.

#### Tech Stack

| Tecnologia                                                                                                              |                                                      |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **[NodeJS](https://nodejs.org/docs/latest/api/)**                                                                       | Runtime JavaScript                                   |
| **[TypeScript](https://www.typescriptlang.org/docs/)**                                                                  | Tipagem estática                                     |
| **[NestJS](https://docs.nestjs.com/)**                                                                                  | Framework NodeJs                                     |
| **[Mongoose](https://mongoosejs.com/docs/)** + **[`@nestjs/mongoose`](https://docs.nestjs.com/techniques/mongodb)**     | ODM                                                  |
| **[kafkaJS](https://kafka.js.org/docs/)** + **[`@nestjs/microservices`](https://docs.nestjs.com/microservices/basics)** | Mensageria assíncrona                                |
| **[OpenTelemetry](https://opentelemetry.io/docs/)**                                                                     | Tracing distribuído ponta a ponta                    |
| **[Pino](https://getpino.io/#/)**                                                                                       | Logging estruturado com transporte para Loki         |
| **[Prometheus](https://prometheus.io/docs/)**                                                                           | Métricas exportadas via `/api/v1/metrics`            |
| **[nestjs-cls](https://papooch.github.io/nestjs-cls/)**                                                                 | Context Propagation para Correlation ID              |
| **[Zod](https://zod.dev/)**                                                                                             | Validação de variáveis de ambiente em runtime        |
| **[Jest](https://jestjs.io/)** + **[SWC](https://swc.rs/docs/)**                                                        | Test runner                                          |
| **[Testcontainers](https://node.testcontainers.org/)**                                                                  | Infra real em Docker para testes de integração e e2e |
| **[Sinon](https://sinonjs.org/)**                                                                                       | Mocks, stubs e spies para testes unitários           |
| **[Nock](https://github.com/nock/nock)**                                                                                | Mock de HTTP para testes unitários                   |
| **[Supertest](https://github.com/ladjs/supertest)**                                                                     | Assertions HTTP para testes e2e                      |

#### Endpoints

| Método | Rota                                      | Parâmetros                                   |
| ------ | ----------------------------------------- | -------------------------------------------- |
| `GET`  | `api/v1/health`                           | —                                            |
| `GET`  | `api/v1/terminals`                        | `page`, `perPage` _(query)_                  |
| `GET`  | `api/v1/terminals/:terminalId`            | `terminalId` _(path)_                        |
| `GET`  | `api/v1/terminals/:terminalId/validation` | `terminalId` _(path)_, `cargoType` _(query)_ |

#### Kafka

O terminal-service está conectado ao Kafka (`terminal-service-client`), mas ainda não consome ou produz nenhum tópico.

### gate-service

Serviço responsável pelo processamento de eventos CDC (Change Data Capture) via Kafka Connect + Debezium.

#### Tech Stack

| Tecnologia                                                       |                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------ |
| **[NodeJS](https://nodejs.org/docs/latest/api/)**                | Runtime JavaScript                                           |
| **[TypeScript](https://www.typescriptlang.org/docs/)**           | Tipagem estática                                             |
| **[tsup](https://tsup.egoist.dev/)**                             | Bundler para build                                           |
| **[tsx](https://github.com/privatenumber/tsx)**                  | Runtime TypeScript para desenvolvimento                      |
| **[Jest](https://jestjs.io/)** + **[SWC](https://swc.rs/docs/)** | Test runner                                                  |
| **[Sinon](https://sinonjs.org/)**                                | Mocks, stubs e spies para testes unitários                   |
| **[Nock](https://github.com/nock/nock)**                         | Mock de HTTP para testes unitários                           |

### auth-service

Serviço de autenticação JWT.

#### Tech Stack

| Tecnologia                    |                          |
| ----------------------------- | ------------------------ |
| **[Go](https://go.dev/doc/)** | Linguagem de programação |

---

## Infraestrutura (via Docker)

| Serviço        | Tecnologia                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| API Gateway    | [Kong](https://docs.konghq.com/) — plugins: CORS, Prometheus, OpenTelemetry, Correlation-ID                       |
| Mensageria     | [Kafka](https://kafka.apache.org/documentation/) (KRaft) + [Kafka UI](https://docs.kafka-ui.com/)                 |
| CDC            | [Kafka Connect](https://kafka.apache.org/documentation/#connect) ([Debezium](https://debezium.io/documentation/)) |
| Banco SQL      | [PostgreSQL 18](https://www.postgresql.org/docs/) — database: `container_service_db`                              |
| Banco SQL      | [MariaDB 18](https://www.postgresql.org/docs/) — database: `container_service_db`                                 |
| Banco NoSQL    | [MongoDB](https://www.mongodb.com/docs/) — database: `terminal_service`                                           |
| Cache          | [Redis](https://redis.io/docs/)                                                                                   |
| Métricas       | [Prometheus](https://prometheus.io/docs/) — scrape de Kong, container-service e terminal-service                  |
| Dashboard      | [Grafana](https://grafana.com/docs/)                                                                              |
| Logs           | [Loki](https://grafana.com/docs/loki/)                                                                            |
| Tracing        | [Tempo](https://grafana.com/docs/tempo/)                                                                          |
| Coletor        | [Alloy](https://grafana.com/docs/alloy/) — Docker → Loki, OTLP → Tempo                                            |
| Teste de carga | [K6](https://grafana.com/docs/k6/)                                                                                |
| Stress Testing | [Toxiproxy](https://github.com/Shopify/toxiproxy) — injeção de falhas de rede para testes de resiliência          |

## Como Rodar o projeto

### Pré-requisitos

- Node.js 22.18.0
- GO 1.26.5
- pnpm 11
- Docker e Docker Compose

### Como rodar o projeto via docker

```bash
docker compose up -d # infra + microservices em modo watch (com hot reload)
```

### Como rodar localmente (Projetos baseados em Javascript/Typescript)

```bash
cd microservices/nome-do-microservice
pnpm install # instala as dependencias do projeto
cp .env.example .env # adiciona variáveis de ambiente (dados de exemplo para fins didáticos)

# caso o microservice use Prisma ORM
pnpm db:generate # gera o cliente do Prisma
pnpm db:migrate:deploy # aplica migrations de forma segura
pnpm db:seed # banco de dados pré populado

pnpm start:dev # inicia o projeto em modo watch (com hot reload)
```

### Como rodar localmente (Projetos baseados em GO)

```bash
cd microservices/nome-do-microservice

```

### Testes

Testes **unitários** usam [Jest](https://jestjs.io/) e [Vitest](https://vitest.dev/) como frameworks de teste Javascript, podendo se utilizar de [Sinon](https://sinonjs.org/) para fakes,mocks,stubs e outros test patterns (Jest e Vitest também possuem essa feature mas o SinonJs foi escolhido por ser mais fiel para com a literatura sobre test patterns)

Testes de **integração** usam [Testcontainers](https://node.testcontainers.org/) para subir instâncias reais de serviços de infra como Kafka, PostgreSQL etc em containers reais Docker juntamente com o [Nock](https://www.npmjs.com/package/nock) para simular requests HTTP.

Testes **E2E** usam [Jest](https://jestjs.io/) e [Vitest](https://vitest.dev/) como frameworks de teste Javascript e [supertest](https://www.npmjs.com/package/supertest) para requests HTTP reais podendo se utilizar também do [Testcontainers](https://node.testcontainers.org/) caso seja necessário infra real.

Testes de **carga** usam [k6](https://k6.io/) para simular requisições reais nos endpoints, validando performance e confiabilidade do sistema sob estresse.

**Arquivos de setup de testes nos microservices:**

- `jest/vite.config.ts` — Arquivo de configuração para os testes unitários, de integração e end-to-end
- `test/unit/setup.unit.ts` — Setup para testes unitários
- `test/integration/setup.integration.ts` — Setup para testes de integração que sobe infra via Testcontainers
- `test/e2e/setup.e2e.ts` — Setup para testes end-to-end

### Scripts

**container-service (Vitest):**

```bash
cd microservices/container-service

pnpm test:unit              # Unitários
pnpm test:int               # Integração
pnpm test:e2e               # E2E
pnpm test:k6                # Carga
```

**terminal-service (Jest):**

```bash
cd microservices/terminal-service

pnpm test:unit              # Unitários (jest)
pnpm test:int               # Integração (infra real via testcontainers)
pnpm test:e2e               # E2E (infra real via testcontainers)
```

## CI/CD

### GitHub Actions

<!-- TODO: pipelines de CI (lint, testes unitários, build de imagens Docker) -->

### Kubernetes

<!-- TODO: manifests e estrutura de deploy dos microservices no cluster -->

### ArgoCD

<!-- TODO: configuração de GitOps e sincronização com o repositório -->

## Autor

@NathanRodriguesVieira99
