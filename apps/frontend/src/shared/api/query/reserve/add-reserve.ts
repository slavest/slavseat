import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { addReserve, getReserveListByDate, getReserveListByUser } from '../../reserve';
import { BaseMutation } from '../type';

export const useAddReserveMutation = ({ onSuccess, onError }: BaseMutation<typeof addReserve>) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation({
    mutationKey: [addReserve.name],
    mutationFn: addReserve,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getReserveListByDate.name],
      });
      queryClient.invalidateQueries({
        queryKey: [getReserveListByUser.name],
      });
      onSuccess?.(data);
    },
    onError,
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const values = useMemo(() => ({ loading, isError, mutate }), [isError, loading, mutate]);

  return values;
};
