export interface SendPendingDocumentationEventContract {
  sendPendingDocumentationEvent: (containerId: string) => Promise<void>
}

export const SEND_DOCUMENTATION_EVENT_CONTRACT = Symbol(
  'sendPendingDocumentationEventContract',
)
