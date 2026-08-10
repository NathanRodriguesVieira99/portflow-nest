import { HttpException } from '@nestjs/common';
import type { Result } from '../result';
import { errorResponse, successResponse } from '../responses';

export const resultToHttp = <T>(result: Result<T>) => {
  if (!result.ok) {
    throw new HttpException(
      errorResponse(result.error.code, result.error.message),
      result.error.status,
    );
  }
  return successResponse(result.value);
};
