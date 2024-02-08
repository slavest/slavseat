import { PickType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class CreateFloorDto extends PickType(Floor, [
  'name',
] as const) {}
