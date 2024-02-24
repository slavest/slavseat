import { OmitType } from '@nestjs/swagger';

import { Facility } from '../entity/facility.entity';

export class FacilitySummaryDto extends OmitType(Facility, [
  'floor',
] as const) {}
