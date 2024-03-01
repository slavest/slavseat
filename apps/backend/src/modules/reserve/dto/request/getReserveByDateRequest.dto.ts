import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class GetReserveByDateRequestDto {
  @ApiProperty({ description: '날짜', format: 'YYYY-MM-DD' })
  @IsDate()
  date: Date;
}
