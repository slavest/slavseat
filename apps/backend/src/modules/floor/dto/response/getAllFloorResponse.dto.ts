import { OmitType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';
import { FloorSummaryDto } from '../floorSummary.dto';

export class GetAllFloorResponseDto extends OmitType(
  FloorSummaryDto,
  [] as const,
) {}
