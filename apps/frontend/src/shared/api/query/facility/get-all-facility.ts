import { useQuery } from '@tanstack/react-query';

import { getAllFacility } from '../../facility';

export const useGetAllFacilityQuery = () =>
  useQuery({
    queryKey: [getAllFacility.name],
    queryFn: getAllFacility,
  });
