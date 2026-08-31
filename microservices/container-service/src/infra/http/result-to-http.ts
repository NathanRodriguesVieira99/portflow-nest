import { HttpException } from '@nestjs/common';
import { errorResponse, successResponse } from '@/infra/http/http-responses';
import type { Http } from '@/domain/types/http';
import type { Result } from '@/domain/types/result';

export const resultToHttp = <
  T,
  E extends { code: Http.Codes; status: Http.Error; message: string },
>(
  result: Result<T, E>,
) => {
  if (!result.ok) {
    throw new HttpException(
      errorResponse(
        result.error.code,
        result.error.status,
        result.error.message,
      ),
      result.error.code,
    );
  }
  return successResponse(result.value);
};
