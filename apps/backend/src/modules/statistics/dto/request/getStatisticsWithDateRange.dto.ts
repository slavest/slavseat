import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetStatisticsWithDateRangeDto {
  @ApiProperty({ description: '시작일' })
  @IsDate()
  @Type(() => Date)
  start: Date;

  @ApiProperty({ description: '종료일' })
  @IsDate()
  @Type(() => Date)
  end: Date;
}
