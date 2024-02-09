import { OmitType } from '@nestjs/swagger';
import { Model } from '@slavseat/types';

import { FloorSummaryDto } from '../floorSummary.dto';

export class GetAllFloorResponseDto
  extends OmitType(FloorSummaryDto, [] as const)
  implements Model.FloorSummary {}
