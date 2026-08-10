# TODO

[ ] - Pensar/Criar um microservice em GO para estudos (talvez o de auth JWT)

## CI CD

[x] - Refatorar pipeline de CI com github actions para preparar o caminho pro k8s + argocd

[x] - Remover etapa de build da img docker para o ghcr do workflow de release e criar pipelines de CI isoladas

[ ] - Configurar K8S e ArgoCD

[ ] - Adicionar pipeline de CI CD com k8s + argocd

## Geral

[x] - Remover acoplamento do Nestjs pelo menos nos testes unitários? aplicar isso para os de integração e E2E?

[x] - Quebrar os services em use cases?

[x] - Criar erros e utils de validacao customizados de domínio

[x] - Criar paths customizados de import no tsconfig

[ ] - Pensar em aplicar o Outbox Pattern + CDC

## Container Service

[x] - Adicionar melhores validações e logs no container service/repo

[ ] - Testes unitários, E2E e de integração

[ ] - Aplicar cache (Redis)

[x] - Aplicar resiliência abstraindo alguma lib (Cockatiel ou opossum ou mollitia)

[x] - Conectar corretamente o Container Service com o Terminal Service (via HTTP e via eventos KAFKA)

[x] - Configurar Swagger

[ ] - Documentar controllers

## Terminal Service

[x] - Setup Kafka (Producer, Consumer etc)

[x] - Setup MongoDB

[ ] - Setup Redis (Cache)

[ ] - Testes unitários, E2E e de integração

[ ] - Aplicar resiliência abstraindo alguma lib (Cockatiel ou opossum ou mollitia)

[x] - Setup Jest + Nock + Sinon (Unit, Int e E2E)

[ ] - Implementar terminal-service (MongoDB, controllers, endpoints, etc.)

[x] - Dockerizar e adicionar terminal-service no docker-compose.yaml

[ ] - Configurar Swagger

[ ] - Documentar controllers

[x] - Configurar logs, traces e métricas (pino,loki,tempo,alloy,prometheus)

## Gate Service

[ ] - Implementar gate-service (Kafka Connect (CDC com PostgreSQL), controllers, endpoints, etc.)

[ ] - Dockerizar e adicionar gate-service no docker-compose.yaml

[ ] - Trocar de postgres para mariadb (init na pasta docker)

[ ] - Testes unitários, E2E e de integração

[ ] - Configurar Swagger

[ ] - Documentar controllers
