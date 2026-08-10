import { errorResponse, successResponse } from '@/@types/responses';
import type { Result } from '@/@types/result';
import { HttpException } from '@nestjs/common';

export const resultToHttp = <T>(result: Result<T>) => {
  if (!result.ok) {
    throw new HttpException(
      errorResponse(result.error.code, result.error.message),
      result.error.status,
    );
  }
  return successResponse(result.value);
};
