import { OmitType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class GetFloorByIdResponse extends OmitType(
  Floor,
  [] as const,
) {}
