import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addFacility, getAllFacility } from '@/shared/api/facility';
import { getFloorDetail } from '@/shared/api/floor';

import { BaseMutation } from '../type';

export const useAddFacilityMutation = ({
  onSuccess,
}: BaseMutation<typeof addFacility> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [addFacility.name],
    mutationFn: (data: Parameters<typeof addFacility>[0]) =>
      addFacility(data),
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
