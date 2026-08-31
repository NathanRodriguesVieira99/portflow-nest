export const KAFKA_CLIENTS = {
  CONTAINER_SERVICE: 'container-service-client',
} as const

export const KAFKA_CONSUMER_GROUPS = {
  CONTAINER_SERVICE: 'container-service-group',
} as const

export const KAFKA_TOPICS = {
  PENDING_DOCUMENTATION: 'portflow.container.pending_documentation',
  DOCUMENTATION_RELEASED: 'portflow.container.documentation_released',
  DOCUMENTATION_REFUSED: 'portflow.container.documentation_refused',
} as const
