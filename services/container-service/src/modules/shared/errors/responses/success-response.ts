export type SuccessResponse<T> = {
  ok: true;
  status: number;
  content: T;
  timestamp: string;
};

export const successResponse = <T = unknown>(
  content: T,
  status = 200,
): SuccessResponse<T> => ({
  ok: true,
  status,
  content,
  timestamp: new Date().toISOString(),
});
