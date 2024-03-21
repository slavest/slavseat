import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  addReserve,
  getReserveListByDate,
  getReserveListByUser,
} from '../../reserve';
import { BaseMutation } from '../type';

export const useAddReserveMutation = ({
  onSuccess,
}: BaseMutation<typeof addReserve>) => {
  const queryClient = useQueryClient();

  return useMutation({
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
  });
};
