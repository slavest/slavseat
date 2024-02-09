import { OmitType } from '@nestjs/swagger';

import { Floor } from '../entity/floor.entity';

export class FloorSummaryDto extends OmitType(Floor, [
  'seats',
] as const) {}
