import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class GetReserveByRangeDateRequestDto {
  @ApiProperty({ description: '사용 시작 날짜', format: 'YYYY-MM-DD' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: '사용 종료 날짜', format: 'YYYY-MM-DD' })
  @IsDate()
  endDate: Date;
}
