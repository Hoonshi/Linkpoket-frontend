import axios from 'axios';
import { z } from 'zod';

const apiErrorSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string().optional(),
  errorCode: z.string(),
});

export type BackendError = z.infer<typeof apiErrorSchema>;

export function handleApiError(error: unknown): unknown {
  // AxiosError가 아니면 원본 에러 반환
  if (!axios.isAxiosError(error)) {
    return error;
  }

  const validation = apiErrorSchema.safeParse(error.response?.data);

  if (!validation.success) {
    return error;
  }

  const errorData = validation.data;

  // 원본 에러 객체의 message만 업데이트
  error.message = errorData.detail || errorData.title;

  // 에러 객체에 구조화된 에러 정보 추가
  (error as any).errorData = errorData;

  return error;
}
