import type { ErrorResponse } from './error-response';
import type { SuccessResponse } from './success-response';

export type RequestResponse<T> = SuccessResponse<T> | ErrorResponse;
