import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllFacility, removeFacility } from '@/api/facility';
import { getFloorDetail } from '@/api/floor';

import { BaseMutation } from '../type';

export const useRemoveFacilityMutation = ({
  onSuccess,
}: BaseMutation<typeof removeFacility> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [removeFacility.name],
    mutationFn: removeFacility,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getAllFacility.name],
      });
      queryClient.invalidateQueries({
        queryKey: [getFloorDetail.name],
      });
      onSuccess?.(data);
    },
  });
};
