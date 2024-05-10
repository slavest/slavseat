import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BaseMutation } from '@/shared/api/query/type';
import { getReserveListByDate, getReserveListByUser, removeReserve } from '@/shared/api/reserve';

export const useCancelReserveMutation = ({
  onSuccess,
  onError,
}: BaseMutation<typeof removeReserve> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [removeReserve.name],
    mutationFn: removeReserve,
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
  });
};
