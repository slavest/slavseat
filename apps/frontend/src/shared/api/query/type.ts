import { AxiosError } from 'axios';

import { ErrorResponse } from '@/shared/types/api.types';

export interface BaseMutation<T extends (...args: never) => unknown, V = unknown> {
  onSuccess?: (data: Awaited<ReturnType<T>>) => void;
  onError?: (error: AxiosError<ErrorResponse>, variables: V) => void;
}
