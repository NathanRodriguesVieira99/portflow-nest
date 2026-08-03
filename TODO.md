# TODO

## Geral

[x] - Remover acoplamento do Nestjs pelo menos nos testes unitários? aplicar isso para os de integração e E2E?

[x] - Quebrar os services em use cases?

[ ] - Testes unitários, E2E e de integração

[x] - Criar erros e utils de validacao customizados de domínio

[x] - Criar paths customizados de import no tsconfig

[x] - Aplicar resiliência abstraindo alguma lib (Cockatiel)

[ ] - Aplicar cache (Redis)

[ ] - Pensar em aplicar o Outbox Pattern + CDC

## Container **Service**

[x] - Adicionar melhores validações e logs no container service/repo

[ ] - Conectar corretamente o Container Service com o Terminal Service (via HTTP e via eventos KAFKA)

[x] - Configurar Swagger

[ ] - Documentar controllers

## Terminal Service

[ ] - Implementar terminal-service (MongoDB, controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar terminal-service no docker-compose.yaml

[ ] - Configurar Swagger

[ ] - Documentar controllers

[ ] - Configurar logs, traces e métricas (pino,loki,tempo,alloy,prometheus)

[ ] - Configurar KAFKA

## Gate Service

[ ] - Implementar gate-service (Kafka Connect (CDC com PostgreSQL), controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar gate-service no docker-compose.yaml

[ ] - Configurar Swagger

[ ] - Documentar controllers
