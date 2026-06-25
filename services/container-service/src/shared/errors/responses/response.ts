import type { ErrorResponse } from './error-response';
import type { SuccessResponse } from './success-response';

export type Response<T> = SuccessResponse<T> | ErrorResponse;
