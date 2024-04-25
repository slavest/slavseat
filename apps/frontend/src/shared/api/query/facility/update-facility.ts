import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllFacility, updateFacility } from '@/shared/api/facility';
import { getFloorDetail } from '@/shared/api/floor';

import { BaseMutation } from '../type';

export const useUpdateFacilityMutation = ({
  onSuccess,
  onError,
}: BaseMutation<typeof updateFacility> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [updateFacility.name],
    mutationFn: (data: Parameters<typeof updateFacility>[0]) => updateFacility(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getAllFacility.name],
      });
      queryClient.invalidateQueries({
        queryKey: [getFloorDetail.name],
      });
      onSuccess?.(data);
    },
    onError,
  });
};
