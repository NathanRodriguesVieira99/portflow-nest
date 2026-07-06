# Portflow

## Sobre

Sistema de gestão portuária baseado em microsserviços com NestJS, mensageria via Kafka e observabilidade.

A comunicação combina REST APIs (síncrona) e eventos Kafka (assíncrona).

## Microservices

### container-service

Serviço responsável pela gestão de contêineres.

#### Tech Stack

| Tecnologia                              |                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| **NodeJS**                              | Runtime JavaScript                                                                 |
| **TypeScript**                          | Tipagem estática                                                                   |
| **NestJS**                              | Framework NodeJs                                                                   |
| **Prisma**                              | ORM                                                                                |
| **kafkaJS** + **@nestjs/microservices** | Mensageria assíncrona                                                              |
| **Redis**                               | Cache                                                                              |
| **OpenTelemetry**                       | Tracing distribuído ponta a ponta                                                  |
| **Pino**                                | Logging estruturado com transporte para Loki                                       |
| **Zod**                                 | Validação de variáveis de ambiente em runtime                                      |
| **Vitest**                              | Test runner rápido, suporta unit / integração / e2e no mesmo config                |
| **Testcontainers**                      | Provisionamento de infra real em containers Docker para testes de integração e e2e |
| **SWC**                                 | Compilação rápida para hot-reload em desenvolvimento                               |

#### Endpoints

| Método | Rota | Descrição |
| ------ | ---- | --------- |
|        |      |           |

#### Kafka Events

| Tópico                                      | Producer          | Consumer          |
| ------------------------------------------- | ----------------- | ----------------- |
| `portflow.container.pending_documentation`  | container-service |                   |
| `portflow.container.documentation_released` |                   | container-service |
| `portflow.container.documentation_refused`  |                   | container-service |

#### Arquitetura do serviço

```txt
src/
├── __tests__/                  # Arquivos de setup dos testes, mocks e factories
│
├── infrastructure/             # Infra global do microservice
│   ├── cache/                  # Configuração do Redis
│   ├── database/prisma/        # Configuração do Prisma
│   ├── http/                   # HTTP client customizado para usar o axios sem acoplamento
│   ├── kafka/                  # Configuração do Kafka
│   └── observability/          # Configuração dos Logs, métricas e tracing
│
├── modules/
│   └── container/
│       ├── application/services/    # Casos de uso
│       │   ├── container.service.ts
│       │   └── terminal.service.ts
│       │
│       ├── domain/
│       │   ├── contracts/       # Contratos dos inputs e outputs para os métodos não precisarem usar os DTOs da camada de presentation
│       │   ├── events/          # Contratos para eventos do Kafka
│       │   ├── models/          # Entidades de domínio
│       │   ├── repositories/    # Contratos para os repositórios
│       │   └── types/           # Tipos e/ou Value objects
│       │
│       ├── infrastructure/
│       │   ├── events/          # Eventos Kafka (Producers e Consumers)
│       │   ├── http/            # HTTP clients construídos encima do HTTP Client customizado do axios para comunicação síncrona entre microservices
│       │   ├── mappers/         # Mappers entre Prisma e domain
│       │   └── repositories/    # Implementação dos repositórios
│       │
│       └── presentation/
│           ├── controllers/     # Endpoints
│           └── dtos/            # DTOs
│
└── shared/
    ├── config/                 # Zod schema para validar variáveis de ambiente em runtime
    ├── constants/              # Constantes utilizadas em várias partes do microservice
    └── errors/                 # Exceptions customizadas e Result Pattern
```

---

## Infraestrutura (Docker)

| Serviço        | Tecnologia               |
| -------------- | ------------------------ |
| API Gateway    | Kong                     |
| Mensageria     | Kafka (KRaft) + Kafka UI |
| CDC            | Kafka Connect (Debezium) |
| Banco SQL      | PostgreSQL 18            |
| Banco NoSQL    | MongoDB                  |
| Cache          | Redis                    |
| Métricas       | Prometheus               |
| Dashboard      | Grafana                  |
| Logs           | Loki                     |
| Tracing        | Tempo                    |
| Coletor        | Alloy                    |
| Teste de carga | K6                       |

## Como Rodar o projeto

### Pré-requisitos

- Node.js 22
- pnpm 11
- Docker e Docker Compose

### Como rodar o projeto via docker

```bash
pnpm docker:up # infra + microservices em modo watch (com hot reload)
```

### Como rodar localmente

```bash
cd nome-do-microservice
pnpm install # instala as dependencias do projeto
cp .env.example .env # adiciona variáveis de ambiente (dados de exemplo para fins didáticos)
pnpm db:generate # gera o cliente do Prisma
pnpm db:migrate:deploy # aplica migrations de forma segura
pnpm db:seed # banco de dados pré populado
pnpm start:dev # inicia o projeto em modo watch (com hot reload)
```

### Testes

Testes de **integração** e **e2e** usam [Testcontainers](https://node.testcontainers.org/) para subir instâncias reais de serviços de infra como Kafka, PostgreSQL etc em containers reais Docker, com as migrations do Prisma aplicadas automaticamente antes da execução.

Testes de **carga** usam [k6](https://k6.io/) para simular requisições reais nos endpoints, validando performance e confiabilidade do sistema sob estresse.

**Arquivos de setup:**

- `vite.config.ts` — Arquivo de configuração para os testes unitários, de integração e end-to-end
- `src/__tests__/setup.integration.ts` — Sobe infra via Testcontainers, roda `prisma migrate deploy`, trunca as tabelas antes de cada teste
- `src/__tests__/setup.e2e.ts` — Mesma lógica do setup de integração, porém voltado para os testes end-to-end
- `src/__tests__/setup.unit.ts` — Setup leve para testes unitários

```bash
cd nome-do-microservice

pnpm test:unit              # Unitários
pnpm test:int               # Integração (infra real via testcontainers)
pnpm test:e2e               # E2E (infra real via testcontainers)
pnpm test:all               # Todos (unidade,integração e end-to-end)
pnpm test:k6                # Carga
```

## Autor

@NathanRodriguesVieira99
