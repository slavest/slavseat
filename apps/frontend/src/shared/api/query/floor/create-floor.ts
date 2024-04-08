import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createFloor,
  getAllFloorSummary,
  getFloorDetail,
} from '@/shared/api/floor';

import { BaseMutation } from '../type';

export const useCreateFloorMutation = ({
  onSuccess,
  onError,
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
    onError,
  });
};
