import { PickType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class GetFloorImageRequestDto extends PickType(Floor, [
  'id',
] as const) {}
