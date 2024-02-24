import { OmitType } from '@nestjs/swagger';
import { Model } from '@slavseat/types';

import { Seat } from '../../entity/seat.entity';

export class GetAllSeatResponseDto extends OmitType(Seat, [
  'floor',
]) {}
