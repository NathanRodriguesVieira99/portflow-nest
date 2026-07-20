# TODO

## Geral

[x] - Criar erros e utils de validacao customizados de domínio

[x] - Criar paths customizados de import no tsconfig

[ ] - Testes unitários, E2E e de integração

[ ] - Aplicar resiliência abstraindo alguma lib (escolher entre Opossum ou Cockatiel) e cache (Redis)

[ ] - Pensar em aplicar o Outbox Pattern + CDC

[x] - Configurar Swagger (NestJs Docfy)

## Container Service

[x] - Adicionar melhores validações e logs no container service/repo

[ ] - Conectar corretamente o Container Service com o Terminal Service (via HTTP e via eventos KAFKA)

## Terminal Service

[ ] - Implementar terminal-service (MongoDB, controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar terminal-service no docker-compose.yaml

## Gate Service

[ ] - Implementar gate-service (Kafka Connect (CDC com PostgreSQL), controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar gate-service no docker-compose.yaml
