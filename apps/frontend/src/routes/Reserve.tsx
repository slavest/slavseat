import React from 'react';

import { Badge, Status } from '@/components/atoms/Badge';

export function Reserve() {
  return (
    <>
      <Badge status={Status.ABLE_RESERVE} />
    </>
  );
}
