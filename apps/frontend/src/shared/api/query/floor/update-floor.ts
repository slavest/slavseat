import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllFloorSummary, getFloorDetail, updateFloor } from '@/shared/api/floor';

import { BaseMutation } from '../type';

export const useUpdateFloorMutation = ({
  onSuccess,
  onError,
}: BaseMutation<typeof updateFloor> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [updateFloor.name],
    mutationFn: updateFloor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getAllFloorSummary.name],
      });
      queryClient.invalidateQueries({
        queryKey: [getFloorDetail.name],
      });
      onSuccess?.(data);
    },
    onError,
  });
};
