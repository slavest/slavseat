import { PickType } from '@nestjs/swagger';

import { Reserve } from '../../entity/reserve.entity';

export class GetReserveByUserRequestDto extends PickType(Reserve, [
  'user',
] as const) {}
