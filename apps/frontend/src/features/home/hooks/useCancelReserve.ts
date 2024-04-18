import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { removeReserve } from '@/shared/api/reserve';

interface UseCancelReserveArgs {
  onSuccess?: ({ removed }: { removed: number }) => void;
  onError?: () => void;
}

export function useCancelReserve({
  onSuccess,
  onError,
}: UseCancelReserveArgs) {
  const [loading, setLoading] = useState(false);

  const { mutate, isError } = useMutation({
    mutationFn: removeReserve,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError,
  });

  const values = useMemo(
    () => ({ loading, isError, mutate }),
    [isError, loading, mutate],
  );

  return values;
}
