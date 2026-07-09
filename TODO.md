# TODO

## Container Service

[x] - Adicionar melhores validações e logs no container service/repo

[ ] - Testes unitários, E2E e de integração

[ ] - Conectar corretamente o Container Service com o Terminal Service (via HTTP e via eventos KAFKA)

[ ] - Aplicar resiliência abstraindo alguma lib (escolher entre Opossum ou Cockatiel) e cache (Redis)

[ ] - Pensar em aplicar o Outbox Pattern + CDC

## Terminal Service

[ ] - Implementar terminal-service (MongoDB, controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar terminal-service no docker-compose.yaml

[ ] - Testes unitários, E2E e de integração

[ ] - Aplicar resiliência abstraindo alguma lib (escolher entre Opossum ou Cockatiel) e cache (Redis)

[ ] - Pensar em aplicar o Outbox Pattern + CDC

## Gate Service

[ ] - Implementar gate-service (Kafka Connect (CDC com PostgreSQL), controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar gate-service no docker-compose.yaml

[ ] - Testes unitários, E2E e de integração

[ ] - Aplicar resiliência abstraindo alguma lib (escolher entre Opossum ou Cockatiel) e cache (Redis)

[ ] - Pensar em aplicar o Outbox Pattern + CDC
