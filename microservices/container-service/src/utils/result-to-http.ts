import { HttpException } from '@nestjs/common';
import { errorResponse, successResponse } from '@/utils/http-responses';
import type { Result } from '../../../@types/result';

export const resultToHttp = <T>(result: Result<T>) => {
  if (!result.ok) {
    throw new HttpException(
      errorResponse(result.error.code, result.error.message),
      result.error.status,
    );
  }
  return successResponse(result.value);
};
