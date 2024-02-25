export const getFacilityLockKey = (facilityId: string | number) =>
  `facility:reserve:${facilityId}`;
