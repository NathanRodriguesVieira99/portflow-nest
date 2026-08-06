# TODO

## Geral

[x] - Remover acoplamento do Nestjs pelo menos nos testes unitários? aplicar isso para os de integração e E2E?

[x] - Quebrar os services em use cases?

[ ] - Testes unitários, E2E e de integração

[x] - Criar erros e utils de validacao customizados de domínio

[x] - Criar paths customizados de import no tsconfig

[x] - Aplicar resiliência abstraindo alguma lib (Cockatiel)

[ ] - Pensar em aplicar o Outbox Pattern + CDC

## Container Service

[x] - Adicionar melhores validações e logs no container service/repo

[ ] - Aplicar cache (Redis)

[ ] - Conectar corretamente o Container Service com o Terminal Service (via HTTP e via eventos KAFKA)

[x] - Configurar Swagger

[ ] - Documentar controllers

## Terminal Service

[x] - Setup Kafka (Producer, Consumer etc)

[x] - Setup MongoDB

[ ] - Setup Redis (Cache)

[ ] - Setup Resiliência (Adapter igual ao terminal service ou criar novo adapter para outra lib para estudar?)

[ ] - Setup HTTP Client (Adapter igual ao terminal service ou criar novo adapter para outra lib para estudar?)

[x] - Setup Jest + Nock + Sinon (Unit, Int e E2E)

[ ] - Implementar terminal-service (MongoDB, controllers, endpoints, etc.)

[x] - Dockerizar e adicionar terminal-service no docker-compose.yaml

[ ] - Configurar Swagger

[ ] - Documentar controllers

[x] - Configurar logs, traces e métricas (pino,loki,tempo,alloy,prometheus)

## Gate Service

[ ] - Implementar gate-service (Kafka Connect (CDC com PostgreSQL), controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar gate-service no docker-compose.yaml

[ ] - Configurar Swagger

[ ] - Documentar controllers
