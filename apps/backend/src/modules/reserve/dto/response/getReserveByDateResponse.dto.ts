import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { FloorSummaryDto } from 'src/modules/floor/dto/floorSummary.dto';

import { Reserve } from '../../entity/reserve.entity';

class FacilitySummaryWithFloorDto extends OmitType(Facility, [
  'floor',
]) {
  @ApiProperty({ type: FloorSummaryDto })
  floor: FloorSummaryDto;
}

export class GetReserveByDateResponseDto extends OmitType(Reserve, [
  'facility',
]) {
  @ApiProperty({ type: FacilitySummaryWithFloorDto })
  facility: FacilitySummaryWithFloorDto;
}
