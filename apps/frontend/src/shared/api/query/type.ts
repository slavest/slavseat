import { AxiosError } from 'axios';

import { ErrorResponse } from '@/shared/types/api.types';

export interface BaseMutation<T extends (...args: never) => unknown> {
  onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  onError?: (error: AxiosError<ErrorResponse>) => void;
}
