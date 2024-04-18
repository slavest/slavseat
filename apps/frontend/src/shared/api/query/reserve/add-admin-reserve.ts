import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
  addAdminReserve,
  getReserveListByDate,
  getReserveListByUser,
} from '../../reserve';
import { BaseMutation } from '../type';

export const useAddAdminReserveMutation = ({
  onSuccess,
  onError,
}: BaseMutation<typeof addAdminReserve>) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [addAdminReserve.name],
    mutationFn: addAdminReserve,
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

  const values = useMemo(
    () => ({ loading, mutate }),
    [loading, mutate],
  );

  return values;
};
