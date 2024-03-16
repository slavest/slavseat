import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createFloor,
  getAllFloorSummary,
  getFloorDetail,
} from '@/api/floor';

import { BaseMutation } from '../type';

export const useCreateFloorMutation = ({
  onSuccess,
}: BaseMutation<typeof createFloor> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [createFloor.name],
    mutationFn: createFloor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getAllFloorSummary.name],
      });
      queryClient.invalidateQueries({
        queryKey: [getFloorDetail.name],
      });
      onSuccess?.(data);
    },
  });
};
