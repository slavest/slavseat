import { PickType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class GetFloorByIdDto extends PickType(Floor, [
  'id',
] as const) {}
