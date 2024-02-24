import { PickType } from '@nestjs/swagger';

import { Facility } from '../../entity/facility.entity';

export class RemoveFacilityRequestDto extends PickType(Facility, [
  'id',
] as const) {}
