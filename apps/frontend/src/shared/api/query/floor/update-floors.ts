import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllFloorSummary, getFloorDetail, updateFloors } from '@/shared/api/floor';

import { BaseMutation } from '../type';

export const useUpdateFloorsMutation = ({
  onSuccess,
  onError,
}: BaseMutation<typeof updateFloors> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [updateFloors.name],
    mutationFn: updateFloors,
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
