import { PickType } from '@nestjs/swagger';

import { Reserve } from '../../entity/reserve.entity';

export class RemoveReserveRequestDto extends PickType(Reserve, [
  'id',
] as const) {}
